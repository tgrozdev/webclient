'use client';

import apiClient from './lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface LoadData<> {
  ok: boolean;
  menu: MenuItem[];
  content: ContentItem[];
  error: string;
  debug: string;
}

interface MenuItem{
    id: number;
    type: string;
    text: string;
    title: string;
    url: string;
    priority: number;
    page_id: number;
    
}

interface ContentItem {
  id: number;
  creator_id: number;
  type: string;    
  url: string;
  title: string;
  content: string;
  date: Date;
  comments: boolean;    
  author: string;
  custom: boolean;
  parameters: string | null;
  source: string | null;
  moved: string | null
}

export default function Home() {
  const [currentContent, setCurrentContent] = useState<string>('');

  const getContent = async (action = 'LoadContent') => {
    const response = await apiClient.get<LoadData>('', {
      params: { action },
    });
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['content'],
    queryFn: () => getContent(),
  });

  const LoadContent = (content: ContentItem) => {    
    console.log(content);
    setCurrentContent(content.content);
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
      contentDiv.innerHTML = content.content;
    }
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }

  useEffect(() => {
    if (currentContent) {
      const contentDiv = document.getElementById('content');
      if (contentDiv) {
        contentDiv.innerHTML = currentContent;
      }
    }
  }, [currentContent]);

  if (isLoading) return <div className="flex justify-center items-center h-16">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error loading menu</div>;
  return (
    <main>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                {/* You can add your logo here */}
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {data?.menu?.map((menu) => (
                  <a
                    key={menu.id}
                    href={"#"}
                    onClick={() => {                      
                      const content = data?.content.find(c => c.url === menu.url);
                      if (content) LoadContent(content);                      
                    }}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500"
                  >
                    {menu.title}
                  </a>
                ))}  
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                id="mobile-menu-button"
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                  }
                }}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className="hidden sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {data?.menu?.map((menu) => (
              <a
                key={menu.id}
                onClick={() => {
                  const content = data?.content.find(c => c.url === menu.url);
                  if (content) LoadContent(content);
                }}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                {menu.title}
              </a>
            ))}
          </div>
        </div>
      </nav>      
      <div id="content" className="container mx-auto"></div>
    </main>
  );
}