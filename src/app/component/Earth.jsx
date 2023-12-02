"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import versor from "versor";
import * as topojson from "topojson";
import createBoxShadow from "../../utils/createBoxShadow";

const Earth = ({
  countriesTopoJson,
  fillLand,
  additionalComponents,
  selectedCountry,
  setSelectedCountryDetails,
}) => {
  const width =
    typeof window !== "undefined" && window.innerWidth > 500 ? 500 : 300;
  const sphere = { type: "Sphere" };
  const projection = d3.geoOrthographic().precision(0.1);
  const height = () => {
    const [[x0, y0], [x1, y1]] = d3
      .geoPath(projection.fitWidth(width, sphere))
      .bounds(sphere);
    const dy = Math.ceil(y1 - y0),
      l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
    return dy + "px";
  };
  async function createEarth() {
    const dom = d3
      .select("#DOM")
      .attr("width", width + "px")
      .attr("height", height())
      .style("width", "100%")
      // .style("height", height() + "px")
      .node();
    const context = dom.getContext("2d");
    const path = d3.geoPath(projection, context);

    async function render(world) {
      let land = topojson.feature(world, world.objects.land);
      let borders = topojson.mesh(
        world,
        world.objects.countries,
        (a, b) => a !== b
      );
      context.clearRect(0, 0, width, height());
      context.beginPath(),
        path(sphere),
        (context.fillStyle = "#23363e"),
        context.fill();

      if (fillLand) {
        await fillLand(context, path);
      } else {
        context.beginPath(),
          path(land),
          (context.fillStyle = "#8dba14"),
          context.fill();
      }

      context.beginPath(),
        path(borders),
        (context.strokeStyle = "#f0f0f0"),
        (context.lineWidth = 0.5),
        context.stroke();

      context.beginPath(),
        path(sphere),
        (context.strokeStyle = "#000"),
        (context.lineWidth = 1),
        context.stroke();

      if (additionalComponents) {
        await additionalComponents(context, path);
      }
      if (selectedCountry) {
        createBoxShadow(
          context,
          () => path(selectedCountry.geoData),
          "#83EEFF",
          "#83EEFF"
        );
      }
      return context.canvas;
    }

    let ctx = d3
      .select(context.canvas)
      .call(
        drag(projection)
          .on("drag.render", () => render(countriesTopoJson))
          .on("end.render", () => render(countriesTopoJson))
      )
      .call(() => render(countriesTopoJson))
      .on("click", (event) => {
        // render(countriesTopoJson);
        clickCountry(event);
      })
      .node();

    await d3
      .transition()
      .duration(3000)
      .tween("rotate", () => {
        const r = d3.interpolate(projection.rotate(), [360, 0, 0]); // Rotating 360 degrees over time
        return (t) => {
          projection.rotate(r(t));
          render(countriesTopoJson);
        };
      });

    async function clickCountry(click) {
      const [x, y] = projection.invert([
        click.x - dom.getBoundingClientRect().left,
        click.y - dom.getBoundingClientRect().top,
      ]);
      const feature = topojson.feature(
        countriesTopoJson,
        countriesTopoJson.objects.countries
      );

      for (const d of feature.features) {
        if (d3.geoContains(d, [x, y])) {
          createBoxShadow(context, () => path(d), "#83EEFF", "#83EEFF");
          setSelectedCountryDetails(d);
          break;
        }
      }
    }

    function drag(projection) {
      let v0, q0, r0, a0, l;

      function pointer(event, that) {
        const t = d3.pointers(event, that);

        if (t.length !== l) {
          l = t.length;
          if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
          dragstarted.apply(that, [event, that]);
        }

        // For multitouch, average positions and compute rotation.
        if (l > 1) {
          const x = d3.mean(t, (p) => p[0]);
          const y = d3.mean(t, (p) => p[1]);
          const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
          return [x, y, a];
        }

        return t[0];
      }

      function dragstarted({ x, y }) {
        v0 = versor.cartesian(projection.invert([x, y]));
        q0 = versor((r0 = projection.rotate()));
      }

      function dragged(event) {
        const v1 = versor.cartesian(
          projection.rotate(r0).invert([event.x, event.y])
        );
        const delta = versor.delta(v0, v1);
        let q1 = versor.multiply(q0, delta);

        // For multitouch, compose with a rotation around the axis.
        const p = pointer(event, this);
        if (p[2]) {
          const d = (p[2] - a0) / 2;
          const s = -Math.sin(d);
          const c = Math.sign(Math.cos(d));
          q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
        }

        projection.rotate(versor.rotation(q1));

        // In vicinity of the antipode (unstable) of q0, restart.
        if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
      }

      return d3.drag().on("start", dragstarted).on("drag", dragged);
    }
  }
  useEffect(() => {
    createEarth();
  }, []);

  return (
    <div
      className={`w-full ${
        width === 300 ? "max-w-[300px]" : "max-w-[500px]"
      } my-2 self-center`}
    >
      <canvas id="DOM" className="cursor-move"></canvas>
    </div>
  );
};

export default Earth;
