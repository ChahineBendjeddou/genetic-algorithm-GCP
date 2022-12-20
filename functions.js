const { getColor } = require("./colors.js");

/* Creating a map of NxN size and filling it with 0s. Then it is filling the map with 1s and 0s. */
module.exports.initMap = (pZero, N) => {
  const map = [];

  for (let i = 0; i < N; i++) {
    map.push(Array(N).fill(0));
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      map[i][j] = Math.random() > pZero ? 1 : 0;
      map[j][i] = map[i][j];
    }
  }
  return map;
};

/* Creating a starting population of individuals. */
module.exports.createStartingPopulation = (size, theMap) => {
  const { createIndividual } = module.exports;
  const population = [];
  for (let i = 0; i < size; i++) {
    population.push(createIndividual(theMap));
  }
  return population;
};

/* Creating an individual. */
module.exports.createIndividual = (theMap) => {
  const individual = [];
  for (let i = 0; i < theMap.length; i++) {
    individual.push(getColor());
  }
  return individual;
};

/* Calculating the fitness of an individual. */
module.exports.fitness = (individual, theMap) => {
  let sum = 0;
  for (let i = 0; i < individual.length; i++) {
    for (let j = 0; j < i; j++) {
      if (individual[i] === individual[j]) {
        sum += theMap[i][j];
      }
    }
  }
  return sum;
};

/* Mapping the fitness function to each individual in the population. */
module.exports.fitnessPopulation = (population, theMap) => {
  const { fitness } = module.exports;
  return population.map((individual) => fitness(individual, theMap));
};

/* Selecting parents from the population. */
module.exports.selectParents = (population, fitnesses, N) => {
  const parents = [];
  for (let i = 0; i < N; i++) {
    const index = Math.floor(Math.random() * population.length);
    parents.push(population[index]);
  }
  return parents;
};

/* Creating children from parents. */
module.exports.crossover = (parents, theMap) => {
  const children = [];
  for (let i = 0; i < parents.length; i++) {
    for (let j = 0; j < i; j++) {
      const child = [];
      for (let k = 0; k < parents[i].length; k++) {
        child.push(Math.random() > 0.5 ? parents[i][k] : parents[j][k]);
      }
      children.push(child);
    }
  }
  return children;
};

/* Mutating the children. */
module.exports.mutate = (children, pMutate) => {
  return children.map((child) => {
    return child.map((gene) => {
      return Math.random() > pMutate ? gene : getColor();
    });
  });
};

/* Creating a new generation of individuals. */
module.exports.nextGeneration = (population, theMap, pMutate) => {
  const { fitnessPopulation, selectParents, crossover, mutate } =
    module.exports;
  const fitnesses = fitnessPopulation(population, theMap);
  const parents = selectParents(population, fitnesses, 2);
  const children = crossover(parents, theMap);
  const mutatedChildren = mutate(children, pMutate);
  return mutatedChildren;
};

/* Returning the best individual from the population. */
module.exports.getBest = (population, theMap) => {
  const { fitnessPopulation } = module.exports;
  const fitnesses = fitnessPopulation(population, theMap);
  return population[fitnesses.indexOf(Math.min(...fitnesses))];
};
