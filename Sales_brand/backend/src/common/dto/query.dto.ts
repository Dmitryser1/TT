import { IsOptional, IsString, MinLength } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  query?: string;
}