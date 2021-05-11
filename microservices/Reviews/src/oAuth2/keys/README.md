# Sample Test Keys

Asymmetric Keys for signing JWT Tokens

** ONLY MEANT FOR DEVELOPMENT AND TESTING. DO NOT USE FOR PRODUCTION. **

## Generating keys

Generate a new set of keys

```bash
# Generate Private Key
openssl genrsa -out private.pem 2048

# Generate Public Key
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```
