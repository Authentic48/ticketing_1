<h1 align="center"> Ticketing </h1> <br>

<p align="center">
 Ticketing is an E-commerce app apis built using Microservice architecture. Users can create, edit, update, delete. 
 They can also purchase a ticket by creating an order.  and paying for it before it gets expired. 
</p> 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Testing](#testing)
- [API](#requirements)



## Introduction

Ticketing is an E-commerce app apis built using Microservice architecture. Users can create, edit, update, delete. 
 They can also purchase a ticket by creating an order.  and paying for it before it gets expired. 

## Features

Ticketing:  Description of features 
* authentication and authorization with JWT token
* Create, read, update of freelancer profile
* Create, read, update, delete of order
* expiration of order
* payment of order

## Requirements
This application can on a local or remote kubernetes cluster

### NodeJs
NodeJs installalation in all microservices is necessary in order to run the project

### Docker
* [Docker](https://www.docker.com/get-docker)
* [Kubernetes](https://kubernetes.io)

### Skaffold 
it's necessary in order to automatically sync all changes, build the image and deploy it in the cluster
* [skaffold](https://skaffold.dev)


## Quick start
Make sure the JWT and Stripe key are configured, then you can run the server on your local or remote cluster.

``` 
skaffold dev
```

## Testing

Automate testing were done using Jest. In order to run the test you can navigate in a particular microserive and run the following command
```
npm run test 
```

## Api 


## Signup 
### Request 
`POST '/api/users/signup'`
### Response

``` 
cookie: {jwt: 'token'}
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
}
```
## Signin
### Request 
`POST '/api/users/signin'`
### Response

``` 
cookie: {jwt: 'token'}
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
}
```
## Signout 
### Request 
`POST '/api/users/signout'`
### Response

``` 
{}
```
## Current-user 
### Request 
`GET '/api/users/current-user'`
### Response

``` 
cookie: {jwt: 'token'}
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
}
```
## Tickets
## New 
### Request 
`POST '/api/tickets/new'`
### Response

``` 
{
 id: string;
 title: string;
  price: number;
  userId: string;
  orderId: string;
  version: number;
}
```

## Index 
### Request 
`GET '/api/tickets/'`
### Response

``` 
[
{
  id: string;
  title: string;
  price: number;
  userId: string;
  orderId: string;
  version: number;
}
]
```
## Show 
### Request 
`GET '/api/tickets/:id'`
### Response

``` 
{
  id: string;
  title: string;
  price: number;
  userId: string;
  orderId: string;
  version: number;
}
```
## Update 
### Request 
`PUT '/api/ticketing/:id'`
### Response

``` 
{
  id: string;
  title: string;
  price: number;
  userId: string;
  orderId: string;
  version: number;
}
```
## Order
## New 
### Request 
`POST '/api/orders/'`
### Response

``` 
{
  id: string
  userId: string;
  status: OrderStatus.Created;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
}
```
## Show 
### Request 
`GET '/api/orders/:id'`
### Response

``` 
{
  id: string
  userId: string;
  status: OrderStatus.Created;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
}
```
## Cancel 
### Request 
`PUT '/api/orders/:id'`
### Response

``` 
{
  id: string
  userId: string;
  status: OrderStatus.Created;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
}
```
## Index 
### Request 
`POST '/api/orders/'`
### Response

``` 
[
{
  id: string
  userId: string;
  status: OrderStatus.Created;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
},
]
```
## Payment
`POST '/api/payments/'` 
### Response 
```
{
    'id': 'payment-id',
    'orderId': 'order-id'
}
```
