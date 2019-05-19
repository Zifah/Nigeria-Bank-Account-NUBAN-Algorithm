# NUBAN (Nigerian Uniform Bank Account Number) Algorithm

This repo contains the algorithm for generating and validating a NUBAN (Nigeria Uniform Bank Account Number) in Javascript. The algorithm is based on [this here CBN specification](https://www.cbn.gov.ng/OUT/2011/CIRCULARS/BSPD/NUBAN%20PROPOSALS%20V%200%204-%2003%2009%202010.PDF) for the 10-digit NUBAN. 10-digit is stated because CBN announced not too long ago that it's considering updating the specification for a NUBAN; which might see the NUBAN getting up to 16-digits in length.

## Setting up

- Clone the repo.
- Assuming node is installed on your computer:
  - Restore the node packages which the application depends on using `npm install` from terminal.
  - Run `node index.js` from terminal.

## API Endpoints

### 1. **Get Account Banks**

Given any 10-digit Nigerian bank account number, this endpoint returns a JSON array of banks where that account number could be valid.

A common application of this algorithm in Nigeria today is to cut down the list of banks on USSD interfaces from about 23 to less than 5 after the user enters their bank account number (NUBAN). This comes in handy because a USSD screen can display at most, 160 characters at a time.

_Specification_

`GET /accounts/{10-digit-NUBAN}/banks`

_Sample request_

`GET /accounts/5050114930/banks`

_Sample response_

```json
[
  {
    "name": "PROVIDUS BANK",
    "code": "101"
  },
  {
    "name": "STANDARD CHARTERED BANK",
    "code": "068"
  },
  {
    "name": "WEMA BANK",
    "code": "035"
  },
  {
    "name": "ZENITH BANK",
    "code": "057"
  }
]
```

_Bank model_

- `name`: The name of the Nigerian bank.
- `code`: The CBN unique identifier for the Nigerian Bank. This is a 3-digit literal.

### 2. **Generate Bank Account**

Given any 9-digit number (account serial number) and a 3-digit Nigerian bank code, this endpoint returns the full account number. Here is [a list of Nigerian bank codes](https://github.com/tomiiide/nigerian-banks/blob/master/banks.json) you can use to test this.

_Specification_

`POST /banks/{3-digit bank code}/accounts`

```json
{
    "serialNumber"
}
```

\*\* `serialNumber` should be 9-digits or less. If less than 9-digits, it will be left zero-padded.

_Sample request_

Generate a GTBank account number with serial number: '1656322'

`POST /accounts/058/banks` (058 is bank code for GTBank)

```json
{
  "serialNumber": "1656322"
}
```

_Sample response_

```json
{
  "serialNumber": "001656322",
  "nuban": "0016563228",
  "name": "Hafiz Adewuyi's GTBank account number. Donations are invited!",
  "bankCode": "058",
  "bank": {
    "name": "GUARANTY TRUST BANK",
    "code": "058"
  }
}
```

## To-do

- List of banks to be implemented such that it's never out-of-date. It's currently an in-memory list defined within the source code. It's better to fetch this list from a reliable and always up-to-date source of Nigerian bank information on application start. [This repo](https://github.com/tomiiide/nigerian-banks/blob/master/banks.json) seems like a good start.

- Build an SPA which offers the following features:

  - Generate a valid account number for any Nigerian bank
  - Give me the first 9-digits of your NUBAN and I'll tell you your name 👻👻👻
  - Upload a list of NUBAN + bank codes for validation

    | Account number | Bank Code | Valid |
    | -------------- | --------- | ----- |
    | 0010020030     | 001       | Yes   |
    | 0010020030     | 005       | Yes   |
    | 0010020030     | 050       | No    |
    | 0010020030     | 061       | Yes   |

- Enhance the 'Generate Bank Account' endpoint to generate a serial number itself and return the corresponding NUBAN when the request body is empty or does not contain a valid `serialNumber`.

- Write unit tests. I think a good unit test would be to run at least, 10,000 real bank accounts (`{ accountNumber, bankCode }`) from various banks in Nigeria through the code and verify that for each account, the list of banks returned contains the actual bank.

- Deploy the application to a free Heroku container.
