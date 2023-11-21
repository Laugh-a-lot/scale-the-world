export default function Swatches({ color, options = {} }) {
  let {
    columns = null,
    format,
    unknown: formatUnknown,
    swatchSize = 15,
    swatchWidth = swatchSize,
    swatchHeight = swatchSize,
    marginLeft = 0,
  } = options;
  const id = `-swatches-`;
  const unknown = formatUnknown == null ? undefined : color.unknown();
  const unknowns =
    unknown == null || unknown === d3.scaleImplicit ? [] : [unknown];
  const domain = color.domain().concat(unknowns);
  if (format === undefined) format = (x) => (x === unknown ? formatUnknown : x);

  function entity(character) {
    return `&#${character.charCodeAt(0).toString()};`;
  }

  const columnsSwatchStyle = `.${id}-item {
    break-inside: avoid;
    display: flex;
    align-items: center;
    padding-bottom: 1px;
  }
  
  .${id}-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - ${+swatchWidth}px - 0.5em);
  }
  
  .${id}-swatch {
    width: ${+swatchWidth}px;
    height: ${+swatchHeight}px;
    margin: 0 0.5em 0 0;
  }`;
  if (columns !== null)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: `${+marginLeft}px`,
          minHeight: 24,
          fontSize: 10,
        }}
      >
        <style>{columnsSwatchStyle}</style>
        <div style={{ width: "100%", columns }}>
          {domain.map((value) => {
            const label = `${format(value)}`;
            return (
              <div className={`${id}-item`} key={value}>
                <div
                  className={`${id}-swatch`}
                  style={{ background: color(value) }}
                ></div>
                <div className={`${id}-label`} title={label}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  const swatchStyle = `.${id} {
    display: inline-flex;
    align-items: center;
    margin-right: 1em;
  }
  
  .${id}::before {
    content: "";
    width: ${+swatchWidth}px;
    height: ${+swatchHeight}px;
    margin-right: 0.5em;
    background: var(--color);
    
  }`;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "24px",
        marginLeft: `${+marginLeft}px`,
        fontSize: 10,

      }}
    >
      <style>{swatchStyle}</style>
      <div>
        {domain.map((value) => (
          <span key={value} className={id} style={{ color: color(value) }}>
            {format(value)}
          </span>
        ))}
      </div>
    </div>
  );
}
