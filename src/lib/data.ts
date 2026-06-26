export interface Character {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  quote: string;
  story: string;
  element: string;
  weapon: string;
  powers: string[];
  abilities: { name: string; description: string }[];
}

const rawCharacters = [
  { title: "Kaal", subtitle: "Avatar of Time", image: "/images/avatars/kaal.png", element: "Surya (Sun)", weapon: "Kaal Chakra", powers: ["Time Manipulation", "Time Stop"], quote: `"I AM TIME. THE BEGINNING AND THE END. I AM KAAL."` },
  { title: "Yama", subtitle: "Death", image: "/images/avatars/yama.png", element: "Death", weapon: "Soul Scythe", powers: ["Soul reaping", "Judgment"], quote: `"All things must end. I am the final silence."` },
  { title: "Shani", subtitle: "Calamity", image: "/images/avatars/shani.png", element: "Gravity", weapon: "Staff of Justice", powers: ["Karma manipulation", "Destiny bending"], quote: `"I bring the weight of your actions upon you."` },
  { title: "Kali", subtitle: "Occult", image: "/images/avatars/kali.png", element: "Darkness", weapon: "Kali Blade", powers: ["Dark manipulation", "Illusion", "Energy Absorption"], quote: `"I AM THE DARKNESS THAT DEVOURS THE LIGHT. I AM KALI."` },
  { title: "Parashakti", subtitle: "Explosive Energy", image: "/images/avatars/parashakti.png", element: "Energy", weapon: "Primal Chakram", powers: ["Creation", "Destruction"], quote: `"From my energy, the cosmos dances."` },
  { title: "Soma", subtitle: "Mind Army", image: "/images/avatars/soma.png", element: "Moon", weapon: "Mind Scepter", powers: ["Telepathy", "Illusion"], quote: `"The mind is a battlefield, and I am its commander."` },
  { title: "Bhadra", subtitle: "Primal Force", image: "/images/avatars/bhadra.png", element: "Fire", weapon: "Beast Claws", powers: ["Primal rage", "Strength"], quote: `"Unleash the beast within."` },
  { title: "Mohni", subtitle: "Morphism", image: "/images/avatars/mohni.png", element: "Illusion", weapon: "Mirror Shield", powers: ["Shapeshifting", "Charm"], quote: `"Reality is but a reflection I control."` },
  { title: "Kuber", subtitle: "Wealth Weapon", image: "/images/avatars/kuber.png", element: "Earth", weapon: "Golden Mace", powers: ["Materialization", "Fortitude"], quote: `"All that glitters is mine to command."` }
];

export const characters: Character[] = rawCharacters.map((char, i) => ({
  id: `avatar-${i}`,
  number: `0${i + 1}`,
  title: char.title,
  subtitle: char.subtitle,
  image: char.image,
  quote: char.quote,
  story: `The Kirit Universe is home to nine ancient forces. ${char.title} represents the raw manifestation of ${char.subtitle}. When balance collapses and chaos rises, these cosmic forces descend. Not to rule. Not to save. But to restore what was always meant to be.`,
  element: char.element,
  weapon: char.weapon,
  powers: char.powers,
  abilities: [
    { name: "Ultimate Force", description: `Unleashes the full power of the ${char.element}.` },
    { name: "Realm Domain", description: `Transports enemies to the ${char.title} Lok.` }
  ]
}));

export function getCharacter(id: string) {
  return characters.find(c => c.id === id) || characters[0];
}

export function getAdjacentCharacters(id: string) {
  const index = characters.findIndex(c => c.id === id);
  if (index === -1) return { prev: characters[characters.length - 1], next: characters[1] };
  
  const prev = index === 0 ? characters[characters.length - 1] : characters[index - 1];
  const next = index === characters.length - 1 ? characters[0] : characters[index + 1];
  
  return { prev, next };
}
