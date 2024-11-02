import norte from '@/src/assets/Norte.svg';
import nordeste from '@/src/assets/Nordeste.svg';
import centroOeste from '@/src/assets/Centro Oeste.svg';
import sudeste from '@/src/assets/Sudeste.svg';
import sul from '@/src/assets/Sul.svg';
import { Card, CardProps } from "./card";

const regions: CardProps[] = [
  { alt: "Norte", src: norte, regionId: '057a7e96-7818-43c3-8114-c001e2f88f55' },
  { alt: "Nordeste", src: nordeste, regionId: '4e356fb5-caaf-41cd-be0f-402d3d6bf14f' },
  { alt: "Centro-Oeste", src: centroOeste, regionId: 'c88fdf1a-b04f-4640-a4c4-82066f5e60cf' },
  { alt: "Sudeste", src: sudeste, regionId: 'cdc62b6c-8524-41a5-85ae-8fdd174052ad' },
  { alt: "Sul", src: sul, regionId: 'fbbac545-cab2-49cf-a5d0-0e7f4c357abd' },
];

export function Regions() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-10">
      <div>
        <h1 className="font-bold text-3xl">
          Escolha uma das regiões
        </h1>
        <p className="text-center">
          Clique em uma das regiões para <br /> acessar seus estados
        </p>
      </div>
      <div className="w-full grid grid-cols-5 gap-10 px-10 items-center justify-center">
        {regions.map((region, index) => (
          <Card regionId={region.regionId} key={index} alt={region.alt} src={region.src} />
        ))}
      </div>
    </main>
  );
}
