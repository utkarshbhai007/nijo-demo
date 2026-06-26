import { getCharacter, getAdjacentCharacters, characters } from "@/lib/data";
import { CharacterClient } from "./client";

export function generateStaticParams() {
  return characters.map((c) => ({
    id: c.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const character = getCharacter(resolvedParams.id);
  return {
    title: `${character.title} - Kirit Universe`,
    description: character.subtitle,
  };
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const character = getCharacter(resolvedParams.id);
  const { prev, next } = getAdjacentCharacters(resolvedParams.id);

  return <CharacterClient character={character} prev={prev} next={next} />;
}
