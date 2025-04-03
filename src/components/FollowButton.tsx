
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FollowButtonProps {
  userId: string;
  onFollowChange?: (isFollowing: boolean) => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const FollowButton: React.FC<FollowButtonProps> = ({ 
  userId, 
  onFollowChange,
  variant = "default",
  size = "sm"
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  // Check if current user is following the profile user
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!user || user.id === userId) return;
      
      try {
        const { data, error } = await supabase
          .from('public.followers')
          .select('*')
          .eq('follower_id', user.id)
          .eq('following_id', userId)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking follow status:', error);
          return;
        }
        
        setIsFollowing(!!data);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };
    
    const getFollowerCount = async () => {
      try {
        const { count, error } = await supabase
          .from('public.followers')
          .select('*', { count: 'exact', head: true })
          .eq('following_id', userId);
        
        if (error) {
          console.error('Error getting follower count:', error);
          return;
        }
        
        setFollowerCount(count || 0);
      } catch (error) {
        console.error('Error getting follower count:', error);
      }
    };
    
    if (user && userId) {
      checkFollowStatus();
      getFollowerCount();
    }
  }, [user, userId]);

  // Toggle follow status
  const toggleFollow = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to follow other users",
        variant: "destructive",
      });
      return;
    }
    
    if (user.id === userId) {
      toast({
        title: "Action not allowed",
        description: "You cannot follow yourself",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isFollowing) {
        // Unfollow
        const { error } = await supabase
          .from('public.followers')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', userId);
          
        if (error) throw error;
        
        setIsFollowing(false);
        setFollowerCount(prev => Math.max(0, prev - 1));
        toast({
          title: "Unfollowed",
          description: "You have unfollowed this user",
        });
      } else {
        // Follow
        const { error } = await supabase
          .from('public.followers')
          .insert({
            follower_id: user.id,
            following_id: userId,
          });
          
        if (error) throw error;
        
        setIsFollowing(true);
        setFollowerCount(prev => prev + 1);
        toast({
          title: "Following",
          description: "You are now following this user",
        });
      }
      
      if (onFollowChange) {
        onFollowChange(!isFollowing);
      }
    } catch (error: any) {
      console.error('Error toggling follow status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update follow status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show the button if viewing own profile
  if (user?.id === userId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant={isFollowing ? "outline" : variant}
        size={size}
        onClick={toggleFollow}
        disabled={isLoading || !user}
        className={isFollowing ? "border-green-500 text-green-600" : ""}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isFollowing ? (
          <>
            <UserMinus className="mr-1 h-4 w-4" />
            Unfollow
          </>
        ) : (
          <>
            <UserPlus className="mr-1 h-4 w-4" />
            Follow
          </>
        )}
      </Button>
      <span className="text-xs text-gray-500">{followerCount} followers</span>
    </div>
  );
};

export default FollowButton;
