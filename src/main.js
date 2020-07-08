const willetCompile = require('willet/lib/compiler');

// TODO setup eslint

const compile = (code) => {
  const context = willetCompile.createContext();
  return willetCompile.compile(context, code);
};

const sampleCode = `const foo = #(items) => {
  const x = "All this is syntax highlighted"
  x
}
foo()`;

const createCompileAndRun = (editor, outputEditor) => () => {
  const willetCode = editor.session.doc.getValue();

  let result = 'undefined';
  try {
    console.log('Compiling', willetCode);
    const compiled = compile(willetCode);
    console.log('-----------------------------------');
    console.log('compiled:', compiled);

    result = JSON.stringify(eval(compiled), null, 2) || 'undefined';
    console.log('-----------------------------------');
    console.log('result:', result);
  }
  catch (error) {
    if (error.data && error.data.errors) {
      result = error.data.errors.join('\n');
    }
    else {
      result = error.message;
    }
  }

  outputEditor.session.doc.setValue(result);
};

const main = () => {
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/willet");

  editor.session.doc.setValue(sampleCode);

  const outputEditor = ace.edit("output");
  outputEditor.setTheme("ace/theme/monokai");
  outputEditor.session.setMode("ace/mode/json");
  outputEditor.setReadOnly(true);

  const compileAndRun = createCompileAndRun(editor, outputEditor);

  // Tie keybindings to compile and run
  editor.commands.addCommand({
    name: 'compile',
    bindKey: { win: 'Ctrl-enter',  mac: 'Cmd-enter' },
    exec: compileAndRun,
    readOnly: true // false if this command should not apply in readOnly mode
  });

  // Tie run button to compile and run
  $('#runButton').click(compileAndRun);
};

window.main = main;
