export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          position: string | null;
          location: string | null;
          bio: string | null;
          favorite_team: string | null;
          twitter_url: string | null;
          tiktok_url: string | null;
          telegram_url: string | null;
          matches_played: number;
          goals_scored: number;
          assists: number;
          rating: number;
          created_at: string;
        };
      };
      friends: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          status: 'pending' | 'accepted' | 'blocked';
          created_at: string;
        };
      };
      private_messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at: string;
          read: boolean;
        };
      };
      predictions: {
        Row: {
          id: string;
          user_id: string;
          match_id: string;
          home_score: number;
          away_score: number;
          points: number;
          created_at: string;
        };
      };
      fantasy_teams: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          players: string[];
          total_points: number;
          gameweek_points: number;
          budget: number;
          created_at: string;
        };
      };
    };
  };
};
