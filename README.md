# Psono to CSV

A simple script to convert the exported psono json from Psono to a csv file (Passbolt/KeepassX format)

## Requirements

- You need Node.js to run this script
- Enpass 6

## Usage

Export your Psono database into json format from the client application

Run the following command and provide the location of the input and output files

```
node parse.js <path to json file> <path to csv output file>
```

By default, it will read `psono.json` and output `passbolt.csv` in local directory

### Disclaimer

Use at own risk. Please verify the csv output yourself before importing to another password manager

### Acknowledgement

This work was inspired by https://github.com/migvill/enpass-to-csv

