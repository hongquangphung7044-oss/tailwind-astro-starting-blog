import { createSignal, onMount, onCleanup } from 'solid-js';
import { isServer } from 'solid-js/web';

const ScrollTopAndComments = () => {
  const [show, setShow] = createSignal(false);

  // 安全检查：如果是服务器环境，直接返回空内容
  if (isServer) return null;

  const handleScroll = () => {
    if (window.scrollY > 50) setShow(true);
    else setShow(false);
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div class={`fixed bottom-8 right-8 z-50 flex flex-col gap-3 ${show() ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} transition-all duration-300`}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        class="rounded-full bg-gray-200 p-3 text-gray-500 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      <button
        onClick={() => document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' })}
        class="rounded-full bg-gray-200 p-3 text-gray-500 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollTopAndComments;
