import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  original_language?: string;
  translated?: boolean;
  time: number;
  photos?: Array<{
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }>;
}

interface GooglePlaceDetails {
  result: {
    reviews: GoogleReview[];
  };
  status: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    const placeId = Deno.env.get("GOOGLE_PLACE_ID");

    if (!apiKey) {
      throw new Error("Google Places API key not configured");
    }

    if (!placeId) {
      throw new Error("Google Place ID not configured");
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=tr&key=${apiKey}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google API request failed: ${response.statusText}`);
    }

    const data: GooglePlaceDetails = await response.json();

    if (data.status !== "OK") {
      throw new Error(`Google API error: ${data.status}`);
    }

    const reviews = data.result.reviews || [];

    const formattedReviews = reviews.map((review) => ({
      customer_name: review.author_name,
      rating: review.rating,
      comment: review.text,
      image_url: review.profile_photo_url || "",
      created_at: new Date(review.time * 1000).toISOString(),
      relative_time: review.relative_time_description,
      author_url: review.author_url || "",
      photos: review.photos?.map(photo => ({
        reference: photo.photo_reference,
        width: photo.width,
        height: photo.height,
      })) || [],
    }));

    return new Response(
      JSON.stringify({ reviews: formattedReviews }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to fetch reviews",
        reviews: [],
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});