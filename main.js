const {
  initMap,
  createStartingPopulation,
  fitnessPopulation,
  fitness,
  nextGeneration,
  getBest,
} = require("./functions.js");

/**
 * It creates a random map, creates a random population of solutions, then iterates through the
 * population, keeping the best solution, and mutating the rest, until it finds a solution with the
 * lowest possible fitness score.
 *
 * The fitness score is the number of adjacent cells with the same color.
 *
 * The map is an array of arrays of numbers. Each number represents if a node is adjacent with another node or not (1:yes,0:no).
 *
 * The population is an array of arrays of numbers. Each number represents a color.
 *
 * The best solution is the one with the lowest fitness score.
 *
 * The function `initMap` creates a random map.
 *
 * The function `createStartingPopulation` creates a random population.
 *
 * The function `fitnessPopulation` calculates the fitness score for each solution in the population.
 *
 * The function `getBest` returns the best solution in the population.
 *
 * The function `
 */
const main = () => {
  const N = 8; /* The size of the map. */
  const pZero = 0.7; /* The probability of a node being adjacent to another node. */
  const pMutate = 0.01; /* The probability of a node being mutated. */
  const theMap = initMap(pZero, N);
  const maxNumColors = 5; /* The maximum number of colors allowed. */
  let i = 0;
  let run = true;
  let best, newFit, colorsUsed;

  let population = createStartingPopulation(N, theMap);

  const beginTime = new Date();
  while (run) {
    best = getBest(population, theMap);
    population.push(best);
    newFit = fitness(best, theMap);
    colorsUsed = new Set(best);
    console.log(colorsUsed.size);
    if (newFit === 0 && colorsUsed.size <= maxNumColors) run = false;
    population = nextGeneration(population, theMap, pMutate);
    i++;
    time = new Date() - beginTime;
  }
  console.log({ i });
  theMap.map((row) => console.log(row.join(" ")));
  console.log({ best, newFit, numColors: colorsUsed.size });
  console.log(`time: ${time / 1000}s`);
};

main();
