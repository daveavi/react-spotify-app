# SRE take-home test

## Terraform

Write a simple AWS configuration using Terraform (https://www.terraform.io/docs/index.html). Just the required resources - don't configure the provider.

* All resources should have sensible naming and descriptions. All should be tagged with key: `Service`, value: `test_service`.
* Do not create or associate any instances. The environment will just be set up ready for instances to be deployed.
* Everything will be using EC2 VPC (not EC2 Classic). Use the VPC id `vpc-11111111`.

The following resources should be configured:

### ELB security group (`aws_security_group`)

* Allow unrestricted access to port 443 (HTTPS)
* Allow all egress

### ELB (`aws_elb`)

* Subnets: `subnet-aaaaaaaa`, `subnet-bbbbbbbb`
* Access logs to `tidal-logs` S3 bucket, prefix `elb/<name>`, every 5 minutes (Where `<name>` is the name you give the ELB)
* Listen on port 443 HTTPS, direct to the instances on port 8080 HTTP. Certificate `arn:aws:iam::123456789012:server-certificate/certName`
* Health check to `/health` every 10s. Healthy/Unhealthy threshold 3. Timeout 2s.
* Security group: The ELB security group

### Application security group (`aws_security_group`)

* Allow access from the ELB security group on port 8080 (hint: use an ingress rule with security_groups)
* Allow all egress

## Docker

Based on the following conditions, set up a Dockerfile for the Java application downloaded from https://s3.amazonaws.com/tidal-fileshare-generic/187a5272-6044-4da6-af73-872efa342f1e/gs-spring-boot-0.1.0.jar

* It should use Java 1.8
* The command to launch the application is: `java -jar gs-spring-boot-0.1.0.jar`
* The default port should be 80 (use the `SERVER_PORT` environment variable)
* Expose the default port
* There should be an environment variable for `NAME` with default `unknown`

Optional: Set up a Docker Compose file that spins up the Java application, with a containerized nginx proxy in front of it.

## Code challenge (Pick one)

Write a small application in the language of your choice, including a brief description of how you approached the solution, any assumptions made, and how to build and run it. Choose one of the following:

* The Timer-o-botic: A small API service that returns the current time, the application's own wall-clock uptime and the total amount of wall-clock and/or cpu time spent processing requests, encoded in a JSON structure returned when queried with a HTTP GET on endpoint /uptime.

* The Measure-o-matic: A small program that reads newline-separated strings from stdin until EOF, and outputs the length of the longest string.

* The Crypt-o-tragic: A small program that reads newline-separated strings from stdin, rotates each 8-bit byte of the string by 4 bits, encodes the resulting bytes as hex and writes the result to stdout.
