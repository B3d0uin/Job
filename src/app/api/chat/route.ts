import {AnthropicStream, StreamingTextResponse} from 'ai';
import {experimental_generateObject} from 'ai';
import {z} from 'zod';
import {Anthropic, anthropic} from '@ai-sdk/anthropic';

import {loadApiKey} from "@ai-sdk/provider-utils";

// const anthropic = new Anthropic({
// 	apiKey: process.env.ANTHROPIC_API_KEY || '',
//
// });

// export const runtime = 'edge';

export async function GET() {
	
	// const { messages } = await req.json();
	
	
	// const response = await anthropic.messages.create({
	// 	messages,
	// 	model: 'claude-3-haiku-20240307',
	// 	stream: true,
	// 	max_tokens: 300,
	// });
	//
	// https://www.gymnasium.se/yrkesguiden/personligt-brev-9265
	const anthropicWithApiKey = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY});
	const result = await experimental_generateObject({
		model: anthropicWithApiKey.messages('claude-3-haiku-20240307'),
		schema: z.object({
			personalInfo: z.object({
				fullName: z.string(),
				email: z.string().email(),
				phoneNumber: z.string().optional(),
				linkedIn: z.string().url().optional(),
				address: z.string().optional(),
			}),
			jobDetails: z.object({
				companyName: z.string(),
				positionTitle: z.string(),
				jobListingURL: z.string().url(),
				jobDescription: z.string(),
			}),
			skills: z.array(z.string()),
			coverLetterStyle: z.enum(['Classic', 'Modern']),
		}), prompt: "Using the details from the attached resume and the" +
			" job listing provided, generate a cover letter for the frontend" +
			" position at Klarna AB. Highlight the candidate's relevant" +
			" experience, skills, and achievements. Ensure the cover letter" +
			" is personalized, aligns with the job requirements, and" +
			" showcases how the candidate can contribute to Klarnas's goals." +
			" Keep the tone Modern, and limit the cover letter to 400 words."
		,
	});
	// const stream = AnthropicStream(result);
	
	console.log(result)
	return new Response(JSON.stringify(result, null, 2));
}