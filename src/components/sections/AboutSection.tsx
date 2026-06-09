import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { SectionHeader } from "@/components/common/SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="bg-surface px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="About Me" />
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="relative min-h-72 overflow-hidden bg-surface-soft">
            <Image
              src="/profile-pic.jpg"
              alt="John Mark R. Adora profile photo"
              fill
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover"
            />
          </Card>
          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              I am John Mark R. Adora, a Bachelor of Science in Computer Science student who is
              passionate about software development, problem solving, and continuous learning.
            </p>
            <p>
              I enjoy building modern web applications, exploring new technologies, and creating
              solutions that improve user experiences.
            </p>
            <p>
              I am continuously expanding my knowledge in software engineering, databases, web
              development, and modern development practices.
            </p>
            <div className="grid gap-4 pt-3 sm:grid-cols-2">
              <Card className="bg-background">
                <p className="text-3xl font-bold text-foreground">4 Years</p>
                <p className="mt-2 text-sm text-muted">
                  4 Years of Learning and Growth in Software engineering and Technology.
                </p>
              </Card>
              <div className="flex items-center">
                <Button href="/resume/RESUME-Adora-v3.docx" variant="secondary" download>
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
