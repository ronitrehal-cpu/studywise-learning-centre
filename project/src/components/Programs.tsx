import { useNavigate } from 'react-router-dom';
import { Card } from './Card';
import { Button } from './Button';
import { Section } from './Section';
import { Reveal } from './Reveal';
import { StaggerGroup } from './StaggerGroup';
import { programsData } from '../data/programData';

export function Programs() {
  const navigate = useNavigate();
  return (
    <Section background="light" id="programs">
      <Reveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Programs Offered
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored learning programs designed to meet your child's educational goals
          </p>
        </div>
      </Reveal>

      <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.15}>
        {programsData.map((program) => {
          const Icon = program.icon;
          return (
            <Card key={program.id} hover className="flex flex-col">
              <div className="bg-sky-100 rounded-xl p-4 w-fit mb-4">
                <Icon className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{program.shortDescription}</p>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Focus Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {program.focusAreas.map((item, i) => (
                    <span
                      key={i}
                      className="bg-stone-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/programs/${program.slug}`)}
              >
                Learn More
              </Button>
            </Card>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
