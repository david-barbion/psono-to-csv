const fs = require('fs');
const args = process.argv;
const inputFile = args[2] || 'psono.json';
const outputFile = args[3] || 'passbolt.csv';

console.log('\nREADING: ' + inputFile + '\n');

function parseFolder(items, csv) {
  items.forEach(folder => {
    const rowData = {
      grouping: '"' + folder.name + '"',
      title: '',
      username: '',
      password: '',
      url: '',
      notes: '',
    };

    if (folder.items) {
      folder.items.forEach(item => {
        console.log("add item " + item.name + " for folder " + folder.name);
        if (item.type === "website_password") {
          var fieldMapping = {
            name: 'title',
            website_password_username: 'username',
            website_password_password: 'password',
            website_password_url: 'url',
            website_password_notes: 'notes',
          };
        } else if (item.type === "application_password") {
          var fieldMapping = {
            name: 'title',
            application_password_username: 'username',
            application_password_password: 'password',
            application_password_url: 'url',
            application_password_notes: 'notes',
          };
        } else if (item.type === "note") {
          var fieldMapping = {
            name: 'title',
            dummy1: 'username',
            dummy2: 'password',
            dummy3: 'url',
            note_notes: 'notes',
          };
        } else {
          console.log("ERROR: unknown item type in export file...");
          process.exit(1);
        }
        Object.keys(fieldMapping).forEach(type => {
          console.log("field " + type + " ==> " + fieldMapping[type]);
          rowData[fieldMapping[type]] = '"' + item[type] + '"';
        });
        csv.push(
          Object.keys(rowData)
            .map(key => rowData[key])
            .join(','),
        );
      });
    }
    if (folder.folders) {
      console.log("parsing subfolder " + folder.name);
      csv.push(parseFolder(folder.folders, csv));
    }
  });
  return (csv);
}

try {
  const contents = fs.readFileSync(inputFile);
  const vault = JSON.parse(contents);

  const csvOutput = ['"Group","Title","Username","Password","URL","Notes"'];

  csvOutput.push(parseFolder(vault.folders, csvOutput));

  console.log('WRITING: ' + outputFile + '\n');
  fs.writeFileSync(outputFile, csvOutput.join('\n'));
} catch (err) {
  throw err;
}
