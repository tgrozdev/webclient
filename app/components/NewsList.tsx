'use client';

import apiClient from '../lib/api-client';
import { ApiResponse } from '../types/api';
import { useQuery } from '@tanstack/react-query';


interface NewsItem {
    id: number;
    url: string;
    title: string;
    content_short: string;
    content_long: string;
    author: string;
    date: string;
    fontpage: boolean;
}

export const getNews = async (action = 'getnews') => {
    const response = await apiClient.get<ApiResponse<NewsItem[]>>('', {
      params: { action },
    });
    console.log(response.data);
    return response.data;
};


export default function NewsList() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['id'],
      queryFn: () => getNews(),
    });
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts</div>;
  
    return (
      <div className="space-y-4">
        {data?.data?.map((post) => (
          <article key={post.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold"><a href={"/news/" + post.url}>{post.title}</a></h2>
            <div className="mt-2" dangerouslySetInnerHTML={{__html: post.content_short}} />
            <div className="mt-2 text-sm text-gray-500">
              Posted on {new Date(post.date).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    );
  } 