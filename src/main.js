const willetCompile = require('willet/lib/compiler');

const compile = (code) => {
  const context = willetCompile.createContext();
  return willetCompile.compile(context, code);
};

const sampleCode = `const foo = #(items) => {
  const x = "All this is syntax highlighted"
  x
}
foo()`;

const main = () => {
  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/willet");

  editor.session.doc.setValue(sampleCode);

  const outputEditor = ace.edit("output");
  outputEditor.setTheme("ace/theme/monokai");
  outputEditor.setReadOnly(true);

  editor.commands.addCommand({
    name: 'compile',
    bindKey: {win: 'Ctrl-M',  mac: 'Ctrl-Shift-M'},
    exec: function(editor) {
      const willetCode = editor.session.doc.getValue();
      console.log('Compiling', willetCode);
      const compiled = compile(willetCode);
      console.log('-----------------------------------');
      console.log('compiled:', compiled);

      const result = eval(compiled);
      console.log('-----------------------------------');
      console.log('result:', result);

      outputEditor.session.doc.setValue(JSON.stringify(result, null, 2) || 'undefined');
    },
    readOnly: true // false if this command should not apply in readOnly mode
  });
};

window.main = main;
