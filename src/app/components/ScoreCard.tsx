import React from "react";
import Link from "next/link";
import { FileMusic } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

interface ScoreCardProps {
  title: string;
  difficulty: string;
  link: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, difficulty, link }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileMusic className="w-6 h-6 mr-2 text-blue-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Dificultad: {difficulty}</p>
        <Link href={link}>
          <Button variant="outline" className="w-full">
            Ver Partitura
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
