const fs = require('fs');

const exampleDir = `${__dirname}/../src/examples`

const files = fs.readdirSync(exampleDir);

const examples = files.map((file) => {
  const contents = fs.readFileSync(`${exampleDir}/${file}`).toString();
  const exampleName = file.replace('.wlt', '').split('_').join(' ');
  return { exampleName, contents };
});

fs.writeFileSync(`${__dirname}/../src/generated_examples.js`,
`module.exports = {
  examples: ${JSON.stringify(examples, null, 2)}
};`);
