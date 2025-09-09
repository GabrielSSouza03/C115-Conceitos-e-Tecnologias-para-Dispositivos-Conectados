'use client';

import { useState, useEffect } from 'react';
import { getApiUrl, API_CONFIG } from '../../config/api';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface Answer {
  id: number;
  answer: number;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  results: { 
    id: number; 
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    correct: boolean; 
  }[];
}

export default function Perguntas() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.QUESTIONS));
      const data = await response.json();
      setQuestions(data);
      setAnswers(data.map((q: Question) => ({ id: q.id, answer: -1 })));
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => 
      prev.map(ans => 
        ans.id === questionId ? { ...ans, answer: answerIndex } : ans
      )
    );
  };

  const handleSubmit = async () => {
    if (answers.some(ans => ans.answer === -1)) {
      alert('Por favor, responda todas as perguntas!');
      return;
    }

    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ANSWERS), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      
      const data = await response.json();
      setResult(data);
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar respostas:', error);
    }
  };

  const resetQuiz = () => {
    setAnswers(questions.map(q => ({ id: q.id, answer: -1 })));
    setSubmitted(false);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Carregando perguntas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Quiz de Conhecimentos Gerais
        </h1>

        {!submitted ? (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {index + 1}. {question.text}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={answers.find(ans => ans.id === question.id)?.answer === optionIndex}
                        onChange={() => handleAnswerSelect(question.id, optionIndex)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                Enviar Respostas
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Resultado do Quiz
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Sua pontuação: <span className="font-bold text-blue-600">{result?.score}</span> de {result?.totalQuestions}
            </p>
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-2">Resumo das respostas:</p>
              <div className="space-y-4">
                {result?.results.map((res, index) => (
                  <div key={res.id} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Pergunta {index + 1}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        res.correct 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {res.correct ? '✓ Correta' : '✗ Incorreta'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{res.questionText}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Sua resposta:</span>
                        <span className={`ml-2 ${res.correct ? 'text-green-600' : 'text-red-600'}`}>
                          {res.userAnswer}
                        </span>
                      </div>
                      {!res.correct && (
                        <div>
                          <span className="font-medium text-gray-700">Resposta correta:</span>
                          <span className="ml-2 text-green-600">{res.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}