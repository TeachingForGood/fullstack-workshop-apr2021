# angular-course-spring-2021
## Angular Course in Spring 2021

This project is intended to be used as a teaching tool for students learning Angular for the first time. Students are expected to have a tech background and a basic understanding of web apps and TypeScript.

Code is heavily commented and branches of this repo are labeled in course order.

## Generate Keys
# Generate Private Key
openssl genrsa -out private.pem 2048

# Generate Public Key
openssl rsa -in private.pem -outform PEM -pubout -out public.pem