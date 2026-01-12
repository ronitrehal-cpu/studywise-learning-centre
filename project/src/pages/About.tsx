import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { EnrollmentForm } from '../components/EnrollmentForm';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Target,
  BookOpen,
  TrendingUp,
  Award,
  Heart,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail
} from 'lucide-react';

export function About() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const showBackArrow = searchParams.get('from') === 'whyus';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const canGoBack = window.history.length > 1 && document.referrer;

    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/', { state: { scrollTo: 'why-studywise' } });
    }
  };

  const handleViewPrograms = () => {
    navigate('/', { state: { scrollTo: 'programs' } });
  };

  const differences = [
    {
      icon: Users,
      title: 'Personalised Learning',
      description: 'Every student learns differently. Our approach adapts to individual needs, strengths, and learning styles.'
    },
    {
      icon: BookOpen,
      title: 'Curriculum-Aligned Teaching',
      description: 'Our programs are carefully aligned with the Australian curriculum to complement school learning.'
    },
    {
      icon: GraduationCap,
      title: 'Experienced Educators',
      description: 'Our qualified teachers bring deep subject knowledge and a passion for helping students succeed.'
    },
    {
      icon: Target,
      title: 'Small Group Focus',
      description: 'Small class sizes ensure every student receives the attention and support they need.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Clear feedback and regular progress updates keep students and parents informed.'
    },
    {
      icon: Award,
      title: 'Exam Readiness',
      description: 'Building both knowledge and confidence to help students perform their best when it matters.'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Understanding Goals',
      description: 'We start by understanding each student\'s current level, challenges, and academic goals.'
    },
    {
      number: 2,
      title: 'Program Placement',
      description: 'Students are placed in the right program with the right support for their needs.'
    },
    {
      number: 3,
      title: 'Consistent Learning',
      description: 'Regular weekly sessions build knowledge, skills, and confidence over time.'
    },
    {
      number: 4,
      title: 'Feedback & Improvement',
      description: 'Ongoing assessment and feedback help students understand their progress and areas for growth.'
    },
    {
      number: 5,
      title: 'Confidence & Results',
      description: 'Students develop both academic skills and the confidence to tackle new challenges.'
    }
  ];

  const values = [
    { icon: TrendingUp, title: 'Growth', description: 'Every student can improve with the right support' },
    { icon: Heart, title: 'Consistency', description: 'Regular practice builds lasting understanding' },
    { icon: Lightbulb, title: 'Clarity', description: 'Clear explanations make learning accessible' },
    { icon: Award, title: 'Confidence', description: 'Success builds the confidence to achieve more' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
      <Section background="gradient">
        <div className="max-w-4xl mx-auto">
          {showBackArrow && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </button>
          )}

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About Studywise
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Supporting students to reach their full potential through quality teaching, personalised learning, and a commitment to academic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={() => scrollToSection('enrollment')}>
                Enrol Now
              </Button>
              <Button variant="outline" onClick={handleViewPrograms}>
                View Programs
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Story
          </h2>
          <div className="space-y-4 text-lg text-gray-600">
            <p>
              Studywise Learning Centre was founded with a simple yet powerful belief: every student has the potential to excel when given the right support, guidance, and learning environment.
            </p>
            <p>
              What began as a small tutoring service has grown into a trusted learning centre serving students across multiple locations. Over the years, we've helped thousands of students build confidence, master challenging concepts, and achieve their academic goals.
            </p>
            <p>
              Our success comes from maintaining a student-first approach. We take the time to understand each learner's unique needs, adapt our teaching methods accordingly, and create a supportive environment where students feel comfortable asking questions and taking on new challenges.
            </p>
            <p>
              Today, Studywise continues to evolve, incorporating the latest educational research and teaching practices while staying true to our core values of personalised learning, academic excellence, and genuine care for every student's success.
            </p>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Target className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide high-quality, personalised education that empowers students to achieve academic success, build confidence, and develop a genuine love for learning.
            </p>
          </Card>

          <Card className="bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 rounded-lg p-3">
                <Lightbulb className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the leading learning centre known for transforming students' academic journeys, fostering lifelong learners, and making quality education accessible to all.
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-l-4 border-blue-700">
            <div className="flex items-start gap-6">
              <div className="text-6xl text-blue-700 leading-none">"</div>
              <div className="flex-1">
                <blockquote className="text-2xl md:text-3xl font-serif text-gray-800 mb-4 leading-relaxed">
                  Education is not the filling of a pail, but the lighting of a fire.
                </blockquote>
                <p className="text-lg text-gray-600 font-semibold mb-6">
                  — William Butler Yeats
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Studywise, we believe this quote captures the essence of meaningful education. Our goal isn't simply to fill students with facts and formulas, but to ignite curiosity, build genuine understanding, and inspire a passion for learning. We focus on helping students develop confidence and critical thinking skills that extend far beyond the classroom, empowering them to become independent, enthusiastic learners.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section background="light">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Studywise Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            What sets us apart and makes Studywise the right choice for your child's learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differences.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <div className="bg-sky-100 rounded-lg p-3 w-fit mb-4">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Studywise Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A clear, structured approach to helping students achieve their academic goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white">
              <div className="flex items-start gap-6">
                <div className="bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-300 flex-shrink-0 hidden sm:block" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="light">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proven Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to excellence is reflected in our track record of student success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white text-center">
            <p className="text-5xl font-bold text-blue-700 mb-2">20+</p>
            <p className="text-lg text-gray-600 font-medium">Years Experience</p>
          </Card>
          <Card className="bg-white text-center">
            <p className="text-5xl font-bold text-blue-700 mb-2">2,000+</p>
            <p className="text-lg text-gray-600 font-medium">Students Taught</p>
          </Card>
          <Card className="bg-white text-center">
            <p className="text-5xl font-bold text-blue-700 mb-2">10,000+</p>
            <p className="text-lg text-gray-600 font-medium">Hours of Teaching</p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do at Studywise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="bg-gradient-to-br from-white to-sky-50 text-center">
                <div className="bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section background="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the Studywise community and give your child the support they need to excel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={() => scrollToSection('enrollment')}>
              Enrol Now
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('about-contact-studywise')}>
              Contact Us
            </Button>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div id="about-contact-studywise" className="max-w-4xl mx-auto scroll-mt-24">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Contact Studywise</h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-700" />
                <span className="text-gray-700 font-medium">03 8774 7303</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-700" />
                <span className="text-gray-700 font-medium">0430 095 076</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-700" />
                <span className="text-gray-700 font-medium">admin@studywiselearning.com.au</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:0387747303"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href="sms:0430095076"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Phone className="w-4 h-4" />
                Text
              </a>
              <a
                href="mailto:admin@studywiselearning.com.au"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      </Section>

      <EnrollmentForm />
      </main>
      <Footer />
    </div>
  );
}
