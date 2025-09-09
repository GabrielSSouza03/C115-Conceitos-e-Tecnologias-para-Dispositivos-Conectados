import { Injectable } from '@nestjs/common';

interface Question {
  id: number; 
  text: string; 
  options: string[]; 
  correctAnswer: number; 
}

@Injectable()
export class AppService {
  private questions: Question[] = [
    {
      id: 1,
      text: 'Qual é a capital da Itália?',
      options: ['Roma', 'Paris', 'Lisboa', 'Londres'],
      correctAnswer: 0, // Roma
    },
    {
      id: 2,
      text: 'Qual é a capital da França?',
      options: ['Roma', 'Paris', 'Lisboa', 'Londres'],
      correctAnswer: 1, // Paris
    },
  ]; 

  getQuestions(): Omit<Question, 'correctAnswer'>[] {
    return this.questions.map(({ correctAnswer, ...rest }) => rest);
  }
  checkAnswers(answers: { id: number; answer: number }[]) {
    let score = 0;
    const results = answers.map(({ id, answer }) => {
      const question = this.questions.find((q) => q.id === id);
      const correct = question && question.correctAnswer === answer;
      if (correct) score++;
      return {
        id,
        questionText: question?.text || '',
        userAnswer: question?.options[answer] || 'Não respondida',
        correctAnswer: question?.options[question.correctAnswer] || '',
        correct,
      };
    });

    return { 
      score, 
      totalQuestions: this.questions.length,
      results 
    };
  }
}
