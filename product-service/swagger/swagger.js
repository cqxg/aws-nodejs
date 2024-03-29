// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "product-service",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      },
      "post": {
        "summary": "postProduct",
        "description": "",
        "operationId": "postProduct.post./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/PostProductSchema"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get./products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {
    "PostProductSchema": {
      "properties": {
        "title": {
          "title": "PostProductSchema.title",
          "type": "string"
        },
        "description": {
          "title": "PostProductSchema.description",
          "type": "string"
        },
        "prise": {
          "title": "PostProductSchema.prise",
          "type": "number"
        },
        "count": {
          "title": "PostProductSchema.count",
          "type": "number"
        }
      },
      "required": [
        "title",
        "description",
        "prise",
        "count"
      ],
      "additionalProperties": false,
      "title": "PostProductSchema",
      "type": "object"
    }
  },
  "securityDefinitions": {}
};