import React, { useEffect, useState, useRef } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { MessageSquare } from 'lucide-react';

const sampleContent = [
  {
    id: 1,
    type: 'poem',
    title: 'காலத்தின் கோலம்',
    excerpt: 'வாழ்வின் சுழற்சியில் காலம் வரையும் கோலங்கள் எத்தனை அழகானவை. நாம் கடந்து செல்லும் பாதையில் விதைக்கப்படும் நினைவுகள் பூக்களாக மலர்கின்றன.',
    content: 'வாழ்வின் சுழற்சியில் காலம் வரையும் கோலங்கள் எத்தனை அழகானவை. நாம் கடந்து செல்லும் பாதையில் விதைக்கப்படும் நினைவுகள் பூக்களாக மலர்கின்றன. காற்றின் ஓசையில் காதல் கவிதைகள் ஒலிக்கின்றன. நீரின் அலைகளில் நினைவுகள் தவழ்கின்றன. நிலவின் ஒளியில் நேற்றின் கனவுகள் நிழலாடுகின்றன. வானத்தின் விரிவில் வாழ்க்கையின் அர்த்தங்கள் விரிகின்றன.',
    author: 'ரவிக்குமார்',
    authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
    likes: 24,
    dislikes: 2,
    comments: 5,
    date: '2 days ago',
    followers: 128,
    isFollowing: true,
    commentsList: [
      {
        id: 1,
        author: 'குமார்',
        authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/male/8.jpg',
        text: 'இந்த கவிதை மிகவும் அற்புதமாக இருக்கிறது. மீண்டும் படிக்க வேண்டும் என்று தோன்றுகிறது.',
        date: '1 day ago'
      },
      {
        id: 2,
        author: 'சரண்யா',
        authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/female/7.jpg',
        text: 'உங்கள் வார்த்தைகள் என் மனதை தொட்டன. மிக அழகான கவிதை.',
        date: '5 hours ago'
      }
    ]
  },
  {
    id: 2,
    type: 'story',
    title: 'மழைத்துளிகள்',
    excerpt: 'அந்த சிறிய கிராமத்தில் பெய்த மழை அனைவரின் வாழ்க்கையையும் மாற்றியது. குளத்தில் நிரம்பிய நீர் விவசாயிகளின் முகத்தில் புன்னகையை வரவழைத்தது.',
    content: 'அந்த சிறிய கிராமத்தில் பெய்த மழை அனைவரின் வாழ்க்கையையும் மாற்றியது. குளத்தில் நிரம்பிய நீர் விவசாயிகளின் முகத்தில் புன்னகையை வரவழைத்தது. ஏரிக்கரையில் அமர்ந்து அந்த அழகைப் பார்க்கும் குழந்தைகள் கைதட்டி மகிழ்ந்தனர். பசுமை படர்ந்த வயல்களில் பறவைகள் கூட்டம் வந்து அமர்ந்தது. மழைக்குப் பின் வானவில் தோன்றியது போல் அந்த கிராமத்தில் பு���ு வாழ்வு பிறந்தது.',
    author: 'அனிதா',
    authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg',
    likes: 42,
    dislikes: 3,
    comments: 8,
    date: '1 week ago',
    followers: 93,
    isFollowing: true,
    commentsList: [
      {
        id: 1,
        author: 'ரமேஷ்',
        authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/male/10.jpg',
        text: 'மழை பற்றிய உங்கள் விவரிப்பு மிகவும் உண்மையானது. நான் கிராமத்தில் இருப்பது போல் உணர்கிறேன்.',
        date: '2 days ago'
      },
      {
        id: 2, 
        author: 'பிரியா',
        authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/female/11.jpg',
        text: 'இந்த கதை எனக்கு என் சிறுவயதை நினைவூட்டுகிறது. அற்புதமான படைப்பு!',
        date: 'yesterday'
      }
    ]
  },
  {
    id: 3,
    type: 'opinion',
    title: 'மொழியின் முக்கியத்துவம்',
    excerpt: 'தமிழ் மொழியின் வளர்ச்சி இளைய தலைமுறையினரால் தொடர வேண்டும். நம் பாரம்பரியத்தை நாம் போற்றி பாதுகாக்க வேண்டிய நேரம் இது.',
    content: 'தமிழ் மொழியின் வளர்ச்சி இளைய தலைமுறையினரால் தொடர வேண்டும். நம் பாரம்பரியத்தை நாம் போற்றி பாதுகாக்க வேண்டிய நேரம் இது. தமிழ் இலக்கியங்களை படிப்பதன் மூலம் நம் பண்டைய அறிவையும் பண்பாட்டையும் அறியலாம். இன்றைய டிஜிட்டல் யுகத்தில் தமிழ் மொழி தழைத்தோங்க இணையதளங்களின் பங்களிப்பு அதிகரிக்க வேண்டும். கல்வி நிறுவனங்களில் தமிழ் மொழிக்கு முக்கியத்துவம் கொடுக்க வேண்டும். தமிழ் மொழியின் பெருமையை உலகறியச் செய்ய வேண்டும்.',
    author: 'சுரேஷ்',
    authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/male/3.jpg',
    likes: 37,
    dislikes: 5,
    comments: 15,
    date: '3 days ago',
    followers: 76,
    isFollowing: false
  },
  {
    id: 4,
    type: 'poem',
    title: 'நிலவின் நினைவுகள்',
    excerpt: 'இரவில் ஒளிரும் நிலவு போல் நீ என் வாழ்வில் வந்து சென்றாய். உன் நினைவுகள் மட்டும் என்னுடன் நிலைத்து நிற்கின்றன.',
    content: 'இரவில் ஒளிரும் நிலவு போல் நீ என் வாழ்வில் வந்து சென்றாய். உன் நினைவுகள் மட்டும் என்னுடன் நிலைத்து நிற்கின்றன. வானில் தெரியும் நட்சத்திரங்கள் போல் உன் கண்கள் என் மனதில் மின்னுகின்றன. நீ இல்லாத வாழ்க்கை இருளாகத் தெரிகிறது. உன் புன்னகை மட்டும் என் நினைவில் சூரியனாக ஒளிர்கிறது. மீண்டும் ஒருமுறை உன்னைச் சந்திக்கும் நாளுக்காக காத்திருக்கிறேன்.',
    author: 'கமலா',
    authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/female/4.jpg',
    likes: 56,
    dislikes: 1,
    comments: 7,
    date: '4 days ago',
    followers: 215,
    isFollowing: true
  },
  {
    id: 5,
    type: 'story',
    title: 'காற்றின் சுவடுகள்',
    excerpt: 'அந்த வீட்டில் வசிக்கும் அனைவரும் ஒரு மர்மத்தை சுமந்து கொண்டிருந்தனர். நான் அங்கு சென்றபோது அந்த மர்மம் கொஞ்சம் கொஞ்சமாக வெளிப்பட ஆரம்பித்தது.',
    content: 'அந்த வீட்டில் வசிக்கும் அனைவரும் ஒரு மர்மத்தை சுமந்து கொண்டிருந்தனர். நான் அங்கு சென்றபோது அந்த மர்மம் கொஞ்சம் கொஞ்சமாக வெளிப்பட ஆரம்பித்தது. பழைய படிக்கட்டுகள், அறைகளில் உள்ள பழைய புகைப்படங்கள், மூலையில் இருந்த பழைய கடிதங்கள் எல்லாம் ஒரு கதையைச் சொல்லின. அந்த வீட்டின் முந்தைய உரிமையாளர்கள் யார் என்பதைக் கண்டுபிடிக்க நான் தொடங்கினேன். அந்த ஆராய்ச்சியில் கிடைத்த தகவல்கள் என்னை ஆச்சரியப்படுத்தின.',
    author: 'விஜய்',
    authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/male/5.jpg',
    likes: 29,
    dislikes: 4,
    comments: 10,
    date: '1 day ago',
    followers: 64,
    isFollowing: false
  },
  {
    id: 6,
    type: 'opinion',
    title: 'கலை மற்றும் பண்பாடு',
    excerpt: 'தமிழ் கலை மற்றும் பண்பாடு உலகின் மிகப் பழமையான மற்றும் செழுமையான பாரம்பரியங்களில் ஒன்றாகும். நாம் அதை போற்றி பாதுகாக்க வேண்டியது நமது கடமை.',
    content: 'தமிழ் கலை மற்றும் பண்பாடு உலகின் மிகப் பழமையான மற்றும் செழுமையான பாரம்பரியங்களில் ஒன்றாகும். நாம் அதை போற்றி பாதுகாக்க வேண்டியது நமது கடமை. தமிழ் இசை, நடனம், �சிற்பம், ஓவியம் போன்ற கலைகள் நம் பண்பாட்டின் அடையாளங்கள். தமிழ் திரைப்படங்கள் மூலம் நம் கலையை உலகறியச் செய்யலாம். தமிழ் பாரம்பரிய உணவுகள், உடைகள், பழக்கவழக்கங்கள் என அனைத்தையும் அடுத்த தலைமுறைக்கு கொண்டு செல்ல வேண்டும். நம் பண்பாட்டை பாதுகாப்பது ஒவ்வொரு தமிழனின் கடமையாகும்.',
    author: 'மாலதி',
    authorAvatar: 'https://xsgames.co/randomusers/assets/avatars/female/6.jpg',
    likes: 18,
    dislikes: 3,
    comments: 4,
    date: '5 days ago',
    followers: 43,
    isFollowing: false
  }
];

const NoName = () => {
  const [contents, setContents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContents(sampleContent);
      setIsLoading(false);
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        const nextItem = document.querySelector('.snap-start:not(.in-view) + .snap-start');
        if (nextItem) {
          (nextItem as HTMLElement).scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp') {
        const currentItem = document.querySelector('.snap-start.in-view');
        if (currentItem) {
          const prevItem = currentItem.previousElementSibling;
          if (prevItem && prevItem.classList.contains('snap-start')) {
            (prevItem as HTMLElement).scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.7 }
    );

    const contentItems = document.querySelectorAll('.snap-start');
    contentItems.forEach((item) => observer.observe(item));

    return () => {
      contentItems.forEach((item) => observer.unobserve(item));
    };
  }, [contents]);

  const toggleComments = (contentId: number) => {
    setShowComments(showComments === contentId ? null : contentId);
  };

  const handleAddComment = (contentId: number) => {
    if (!newComment.trim()) return;
    
    console.log(`Adding comment to content ${contentId}: ${newComment}`);
    
    setNewComment('');
  };

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, contents.length);
  }, [contents]);

  return (
    <MainLayout>
      <div className="container mx-auto pb-20 md:pb-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">NoName <span className="tamil">படைப்புகள்</span></h2>
          <p className="text-gray-600">Discover trending content from all authors</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="content-card bg-white h-[75vh] w-full max-w-[640px] mx-auto animate-pulse-soft border border-gray-100 shadow-sm rounded-xl">
                <div className="p-5 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="flex-grow bg-gray-100 rounded"></div>
                  <div className="mt-4 flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full max-w-[640px] mx-auto">
            <div className="space-y-4 snap-y snap-mandatory overflow-y-auto h-[75vh] scrollbar-hide">
              {contents.map((content, index) => (
                <div 
                  key={content.id} 
                  ref={el => contentRefs.current[index] = el}
                  className={`snap-start aspect-[4/3] h-[75vh] w-full animate-scale-in bg-white rounded-xl overflow-hidden shadow-md border border-gray-100`}
                >
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={content.authorAvatar} 
                          alt={content.author} 
                          className="w-10 h-10 rounded-full border border-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium">{content.author}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{content.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className={`tamil px-2 py-1 rounded-full ${
                          content.type === 'poem' ? 'bg-blue-100 text-blue-700' : 
                          content.type === 'story' ? 'bg-green-100 text-green-700' : 
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {content.type === 'poem' ? 'கவிதை' : 
                           content.type === 'story' ? 'சிறுகதை' : 'கருத்து'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-grow overflow-y-auto">
                      <h3 className="text-xl font-semibold mb-3 tamil">{content.title}</h3>
                      <p className="text-gray-700 mb-4 tamil whitespace-pre-line">
                        {content.content}
                      </p>
                    </div>

                    <div className="p-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{content.likes}</span>
                          </button>

                          <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                            <span>{content.dislikes}</span>
                          </button>

                          <button 
                            className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors"
                            onClick={() => toggleComments(content.id)}
                          >
                            <MessageSquare className="h-6 w-6" />
                            <span>{content.comments}</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 hover:text-green-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>

                          <button className="text-gray-600 hover:text-blue-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {showComments === content.id && (
                      <div className="p-4 bg-gray-50 border-t max-h-64 overflow-y-auto">
                        <h4 className="font-medium mb-3">Comments</h4>
                        
                        <div className="space-y-3 mb-4">
                          {content.commentsList && content.commentsList.map((comment: any) => (
                            <div key={comment.id} className="flex gap-2">
                              <img 
                                src={comment.authorAvatar} 
                                alt={comment.author} 
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="bg-white p-2 rounded-lg flex-1 shadow-sm">
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-medium">{comment.author}</p>
                                  <span className="text-xs text-gray-500">{comment.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          <img 
                            src="https://xsgames.co/randomusers/assets/avatars/male/20.jpg" 
                            alt="Your avatar" 
                            className="w-8 h-8 rounded-full"
                          />
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(content.id)}
                          />
                          <button
                            className="text-sm bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                            onClick={() => handleAddComment(content.id)}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NoName;
