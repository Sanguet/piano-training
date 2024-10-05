import Link from "next/link";
import { Music, BookOpen, Scale, Sliders, FileMusic } from "lucide-react";

import { Button } from "./components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ElementType;
}

function FeatureCard({
  title,
  description,
  link,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Icon className="w-12 h-12 mb-4 text-blue-500" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-center text-gray-600 mb-4">{description}</p>
      <Link href={link}>
        <Button variant="outline">Explorar</Button>
      </Link>
    </div>
  );
}

export default function PianoTrainingApp() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-500">
              PianoMaestro
            </Link>
            <div className="space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-blue-500">
                Acerca de
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-500"
              >
                Contacto
              </Link>
              <Button>Iniciar sesión</Button>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Mejora tus habilidades en el piano
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Piano Virtual"
            description="Practica con nuestro piano virtual interactivo."
            link="/piano"
            icon={Music}
          />
          <FeatureCard
            title="Lectura de Partituras"
            description="Mejora tu habilidad de lectura a primera vista."
            link="/sight-reading"
            icon={BookOpen}
          />
          <FeatureCard
            title="Escalas"
            description="Aprende y practica diferentes escalas musicales."
            link="/scales"
            icon={Scale}
          />
          <FeatureCard
            title="Técnica"
            description="Desarrolla tu técnica pianística con ejercicios específicos."
            link="/technique"
            icon={Sliders}
          />
          <FeatureCard
            title="Partituras"
            description="Practica con una selección de partituras populares."
            link="/scores"
            icon={FileMusic}
          />
        </div>
      </main>
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 PianoMaestro. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
