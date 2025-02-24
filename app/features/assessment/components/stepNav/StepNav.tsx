import { useAssessment } from '../../context/AssessmentContext';

const steps = [
  { id: 1, title: '基础信息' },
  { id: 2, title: '个性特征' },
  { id: 3, title: '伴侣期望' },
  { id: 4, title: '测评结果' },
];

export default function StepNav() {
  const { state, dispatch } = useAssessment();
  const { currentStep, progress } = state;

  return (
    <nav className="py-4 px-6 bg-white shadow-sm">
      <ol className="flex items-center justify-between">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = progress.stepProgress[step.id - 1] === 100;
          
          return (
            <li 
              key={step.id}
              className={`flex items-center ${
                isActive ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              <span className={`
                w-8 h-8 flex items-center justify-center rounded-full
                ${isActive ? 'bg-primary text-white' : 
                  isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'}
              `}>
                {isCompleted ? '✓' : step.id}
              </span>
              <span className="ml-2">{step.title}</span>
              {step.id < steps.length && (
                <div className={`
                  w-full h-1 mx-4
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 