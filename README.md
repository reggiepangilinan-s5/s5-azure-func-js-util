# Azure Javascript Functions Utilities. 

#### azure-func-js-util
A library to simplify Azure functions development using nodejs.

Installation
```
npm install --save @stationfive/azure-func-js-util
```

## HttpTriggerHandler

Azure functions for `httpTrigger` out of the box does not have the query parameter and request body validation. It is up to you to implement these logic. 
 
 It also requires you to always work with the `context` object and call `context.done()` to complete or terminate the function pipeline execution. 
 

> `HttpTriggerHandler` is a wrapper that hooks into the azure function request and response pipeline and handle the validations before executing the main function logic.


To make your functions `return` a value without calling `context.done()`. 


Set the value  of  `"name": "return"` in you `function.json` file.


e.g.

```
{
    "disabled": false,
    "bindings": [
        {
            "authLevel": "function",
            "type": "httpTrigger",
            "direction": "in",
            "name": "req"
        },
        {
            "type": "http",
            "direction": "out",
            "name": "$return"
        }
    ]
}
```

### Basics

```
const { HttpTriggerHandler } = require('@stationfive/azure-func-js-util/handlers');


const yourFunctionLogic = async (context, req) => {
    // Write your function logic in here.
    return 'Hello azure functions!';
};

module.exports = new HttpTriggerHandler()
  .listen(yourFunctionLogic);
```

### HttpMethod binding

```
const { httpMethods } = require('@stationfive/azure-func-js-util/constants');

module.exports = new HttpTriggerHandler()
  .setHttpMethod(httpMethods.GET)
  .listen(yourFunctionLogic);
```

HttpMethods Supported
```
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH'
```

### Query Params Definition
The query parameters used by your function.

First define a `queryParamsDef` object

`queryParamDef` has the following arguments
  - parameter name
  - is parameter required `true` or `false`
  - (optional) validator function, any function that returns a `boolean`. This will be evaluated automatically in the pipeline.

```
const { queryParamDef } = require('@stationfive/azure-func-js-util/validations');
const queryParams = require('./queryParams');

const queryParamsDef = [
  queryParamDef('parameterName', false),
  queryParamDef('anotherParameterName', true, isValidValue),
];

module.exports = queryParamsDef;

```
Then hook it to the pipeline

```
const queryParamsDef = require('./queryParamsDef');

module.exports = new HttpTriggerHandler()
  .setHttpMethod(httpMethods.GET)
  .setQueryParamsDefinition(queryParamsDef)
  .listen(yourFunctionLogic);
```


### Request Body Definition

The shape of the request body object. If an `Array` of object is passed in as a request body all items should comply with the request body definition. Each item will be evaluated and all errors for each item will returned if there is any.

`requestBodyProp` accepts the following parameters
 - property name
 - (optional) validator function, any function that returns a `boolean`. This will be evaluated automatically in the pipeline.
- (optional) nullable property `true` or `false`, when this is set to `true` validator  function will not be evaluated.

```
const { isNumber } = require('lodash');
const { requestBodyProp, isValidDate } = require('@stationfive/azure-func-js-util/validations');
const reqBodyProps = require('./reqBodyProps');

const reqBodyDef = [
  requestBodyProp(reqBodyProps.site),
  requestBodyProp(reqBodyProps.articleNbr),
  requestBodyProp(reqBodyProps.articleUom),
  requestBodyProp(reqBodyProps.vendorNbr),
  requestBodyProp(reqBodyProps.referenceDate, isValidDate),
  requestBodyProp(reqBodyProps.salesForecast, isNumber),
  requestBodyProp(reqBodyProps.reasonCode),
  requestBodyProp(reqBodyProps.reason),
  requestBodyProp(reqBodyProps.remarks),
];

module.exports = reqBodyDef;
```

 *All properties in a request body are required by default but can be overriden if needed. Just pass a `null` validator and set nullable param to `true`*

```
requestBodyProp('propertyName', null, true)
```


Then hook it to the pipeline

```
module.exports = new HttpTriggerHandler()
  .setHttpMethod(httpMethods.POST)
  .setRequestBodyDefinition(reqBodyDef)
  .listen(planningPostUpdatedForecast);
```


If your use case requires it you can use both query parameters and request body definitions in your function.

## Error Handling

### Bad Request

When your request did not comply to either request body or parameter definitions the function will automatically return a `BadRequest (400)` response object with the list of the errors.

### Internal Server Error

When an exception occured anywhere in your function execution by default an `Internal Server Error (500)` will be returned.

### Manually handling exception

You can manually handle exceptions in your application and terminate the execution by returning and error response object.

- `badRequest`
- `internalServerError`
- `notFound`
- `unauthorized`

All error response object accepts two parameters
 - Message
 - Terminate function execution `true`

```
const notFound = require('@stationfive/azure-func-js-util/handlers/HttpTriggerHandler/response/notFound');

const yourFunction = async (context, req) => {
...
...

  if (!someConditoon) {
    return notFound('Message', true);
  }

  ...
  ...

};
```

## Azure Service Bus
A simple interface to the azure service bus api.

In your application settings set the value of the connection string

```
"AZURE_SERVICEBUS_CONNECTION_STRING": "someValue",
```

How to send messages to a topic

```
// Reference objects
const { newServiceBusMessage, sendTopicMessage } = require('@stationfive/azure-func-js-util/servicebus');


// Code to send topic in your azure function
sendTopicMessage('topicName', newServiceBusMessage(payload));
```





