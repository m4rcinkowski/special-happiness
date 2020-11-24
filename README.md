# Zombies

REST API serving as a CRUD for Zombie collection and managing their items.

## Usage

Provided that you have all given prerequisites, running the API is as simple as running:

```
docker-compose up
```

The app will be available at http://localhost:3000/.

### Prerequisites

* Docker
* docker-compose

## Questions to Product Owner

1. Does the list of zombies need to be paginated? In other words, how many zombies should be diplayed at once if not all of them?
1. Which zombie properties can be altered? (e.g. creation date?)

## TODO

A list of things not done due to a lack of time:

* acceptance criteria
  * CxxD of items
  * currency rate system integration
* redis implementation
* input validation (middleware? pipes?)
* generic pagination (middleware?)
* error to response mapping (stable structure with e.g. validation error message)
* documentation endpoint with the API contract
* CI pipeline automating the testing process - Gitlab-CI or Github Actions

