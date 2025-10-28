
```bash
docker build -t yeoman .
mkdir app
docker run -it --rm -v $(pwd)/app:/app --user $(id -u):$(id -g) yeoman
```

```
? What type of extension do you want to create? New Language Support
Enter the URL (http, https) or the file path of the tmLanguage grammar or press ENTER to start with a new grammar.
? URL or file to import, or none for new: 
? What's the name of your extension? muh2
? What's the identifier of your extension? muh2
? What's the description of your extension? Cashbox muh2
Enter the id of the language. The id is an identifier and is single, lower-case name such as 'php', 'javascript'
? Language id: muh2
Enter the name of the language. The name will be shown in the VS Code editor mode selector.
? Language name: Cashbox muh2
Enter the file extensions of the language. Use commas to separate multiple entries (e.g. .ruby, .rb)
? File extensions: .muh2
Enter the root scope name of the grammar (e.g. source.ruby)
? Scope names: source.muh2
? Initialize a git repository? Yes

Writing in /app/muh2...
   create muh2/syntaxes/muh2.tmLanguage.json
   create muh2/.vscode/launch.json
   create muh2/package.json
   create muh2/README.md
   create muh2/CHANGELOG.md
   create muh2/vsc-extension-quickstart.md
   create muh2/language-configuration.json
   create muh2/.vscodeignore
   create muh2/.gitignore
   create muh2/.gitattributes

Changes to package.json were detected.
Skipping package manager install.


Your extension muh2 has been created!

To start editing with Visual Studio Code, use the following commands:

     code muh2

Open vsc-extension-quickstart.md inside the new extension for further instructions
on how to modify, test and publish your extension.

For more information, also visit http://code.visualstudio.com and follow us @code.
```

