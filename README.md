# Zombies

REST API serving as a CRUD for Zombie collection and managing their items. Uses the CQRS pattern for state management.

## Usage

Provided that you have all given prerequisites, running the API is as simple as running:

```
docker-compose up
```

The app will be available at http://localhost:3000/.

List of all implemented endpoints:

* `{/zombies, POST}`
* `{/zombies, GET}`
* `{/zombies/:zombieId, GET}`
* `{/zombies/:zombieId, PUT}`
* `{/zombies/:zombieId, DELETE}`
* `{/zombies}`
* `{/zombies/:zombieId/items, POST}`
* `{/zombies/:zombieId/items, GET}`
* `{/zombies/:zombieId/items/:itemId, DELETE}`

### Prerequisites

* Docker
* docker-compose

## Questions to Product Owner

1. Does the list of zombies need to be paginated? In other words, how many zombies should be diplayed at once if not all of them?
1. Which zombie properties can be altered? (e.g. creation date?)
1. What happens if we try to add the sixth item? Should it fail or maybe some other (random) item should pop out of the inventory?
1. How items are going to be displayed? At once, after selecting an individual zombie or inventory gets an additional click?

## TODO

A list of things not done due to a lack of time:

* HTTP implementations of item exchange and currency rates services
  * Nest HTTP module
  * Base URIs as environment variables
* input validation
  * Nest pipes
* error handling (cases where exchange item does not exist etc.)
* error to response mapping (stable structure with e.g. validation error message)
* documentation endpoint with the API contract
  * Nest Swagger
* extract some services and entities into common module
  * e.g. CurrencyRateService, Price
* e2e tests validating OpenAPI schemas for both requests and responses
* API versioning with separate e2e test suite for every version
* redis implementation of a cache manager
* generic pagination
* better code coverage
* CI pipeline automating the testing process
  * Gitlab-CI or Github Actions

