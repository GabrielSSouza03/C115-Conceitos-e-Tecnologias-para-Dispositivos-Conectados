import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

interface QuestionResponse {
  id: number;
  text: string;
  options: string[];
}

interface AnswerRequest {
  answers: { id: number; answer: number }[];
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('questions')
  getQuestions(): QuestionResponse[] {
    return this.appService.getQuestions();
  }
  
  @Post('answers')
  checkAnswers(@Body() body: AnswerRequest) {
    return this.appService.checkAnswers(body.answers);
  }
}
