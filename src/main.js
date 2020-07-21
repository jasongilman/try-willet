const willetCompile = require('willet/lib/compiler');

// File generated at build time.
const examples = require('./generated_examples').examples;

const helloWorldExample = examples.filter((e) => e.exampleName === '01 hello world')[0];

const compile = (code) => {
  const context = willetCompile.createContext();
  return willetCompile.compile(context, code);
};

const evalAndCaptureLogs = async (code) => {
  const oldLog = console.log;
  const oldError = console.log;
  let output = '';
  console.log = (...args) => {
    output = `${output}\n${args.join(' ')}`;
  };
  console.error = console.log;
  let result;
  try {
    result = eval(code)

    if (result && result.then) {
      result = await result;
    }
    if (result === undefined) {
      result = 'undefined';
    }
    else {
      result = JSON.stringify(result, null, 2);
    }
  }
  catch (error) {
    if (error.data && error.data.errors) {
      result = error.data.errors.join('\n');
    }
    else {
      result = error.message;
    }
  }
  finally {
    console.log = oldLog;
    console.error = oldError;
  }
  return [
    '// Standard Out', output, '// -----------------------------------------', '// Result', result
  ].join('\n');
};

const createCompileAndRun = (editor, outputEditor) => async () => {
  const willetCode = editor.session.doc.getValue();

  let result = 'undefined';
  try {
    console.log('Compiling', willetCode);
    const compiled = compile(willetCode);
    console.log('-----------------------------------');
    console.log('compiled:', compiled);

    result = await evalAndCaptureLogs(compiled)
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

const setupCodeExamples = (editor) => {
  const menuDiv = $('#addCodeExamplesDropDown > div.dropdown-menu');
  for (const { contents, exampleName } of examples) {
    const child = $(`<a class="dropdown-item" href="#">${exampleName}</a>`);
    menuDiv.append(child);
    child.click(() => {
      editor.session.doc.setValue(contents);
    });
  }
};

const main = () => {
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/willet");
  editor.session.setOptions({
    tabSize: 2,
    useSoftTabs: true
  });

  editor.session.doc.setValue(helloWorldExample.contents);

  const outputEditor = ace.edit("output");
  outputEditor.setTheme("ace/theme/monokai");
  outputEditor.session.setMode("ace/mode/willet");
  outputEditor.setReadOnly(true);

  const compileAndRun = createCompileAndRun(editor, outputEditor);

  // Tie keybindings to compile and run
  editor.commands.addCommand({
    name: 'compile',
    bindKey: { win: 'Ctrl-enter',  mac: 'Cmd-enter' },
    exec: compileAndRun,
    readOnly: true // false if this command should not apply in readOnly mode
  });

  setupCodeExamples(editor);

  // Tie run button to compile and run
  $('#runButton').click(compileAndRun);
};

window.main = main;
