(async () => {
  console.log(ts);
  const contents = await fetch(
    "https://api.github.com/repos/jontem/aoc2019/contents/solutions/"
  ).then(res => res.json());
  console.log(contents);
  for (const content of contents) {
    const partSource = await fetch(content.download_url).then(data =>
      data.text()
    );

    const pre = document.createElement("pre");
    pre.className = "prettyprint";
    pre.innerHTML = partSource;
    const container = document.createElement("div");
    container.appendChild(createHeader(content.name));
    container.appendChild(pre);
    document.body.appendChild(container);
    const result = ts.transpileModule(partSource, {
    //   compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
    console.log(result);
  }

  PR.prettyPrint();
})();

function createHeader(text) {
  const element = document.createElement("h2");
  element.innerText = text;
  return element;
}
