import { test, expect } from '@playwright/test';
import { getEncryptedKey } from './utils';

const pokemonData = [
  { id: 1, name: 'bulbasaur', abilities: ['overgrow', 'chlorophyll'] },
  { id: 25, name: 'pikachu', abilities: ['static', 'lightning-rod'] },
  { id: 143, name: 'snorlax', abilities: ['immunity', 'thick-fat', 'gluttony'] }
];

test.beforeEach(async ({ }, testInfo) => {
  console.log(`Encrypted key: ${getEncryptedKey()}`);
});

for (const pokemon of pokemonData) {
  test(`Search Pokemon by ID: ${pokemon.id}`, async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    const responseTime = Date.now() - startTime;

    expect(response.ok()).toBeTruthy();
    expect(responseTime).toBeLessThan(10000);

    const data = await response.json();
    expect(data.id).toBe(pokemon.id);
    expect(data.name).toBe(pokemon.name);
    expect(data.abilities.map(a => a.ability.name)).toEqual(expect.arrayContaining(pokemon.abilities));
  });

  test(`Search Pokemon by Name: ${pokemon.name}`, async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
    const responseTime = Date.now() - startTime;

    expect(response.ok()).toBeTruthy();
    expect(responseTime).toBeLessThan(10000);

    const data = await response.json();
    expect(data.id).toBe(pokemon.id);
    expect(data.name).toBe(pokemon.name);
    expect(data.abilities.map(a => a.ability.name)).toEqual(expect.arrayContaining(pokemon.abilities));
  });

  test(`Check Wikipedia page for ${pokemon.name}`, async ({ page }) => {
    await page.goto(`https://en.wikipedia.org/wiki/${pokemon.name}`);
    
    const title = await page.title();

    expect(title).toBe(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Wikipedia`);

    const section = await page.waitForSelector('span#Appearances');

    // Buscando el primer párrafo de la sección
    const firstParagraph = await section.evaluateHandle(async (span) => {
      const parent = span.closest('h2')?.nextElementSibling;
      if (parent && parent.tagName === 'P') {
          return parent.innerText;
      }
      return null;
  });
    
    console.log(`First paragraph of "Appearances" for ${pokemon.name}:`, firstParagraph);
  });
}