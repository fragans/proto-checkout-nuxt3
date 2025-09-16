interface DataLayerBookmark {
  bookmarkLocation?: string
}

interface DataLayerContentCustom {
  contentId?: string
  contentCategories?: string | string[]
  contentTitle?: string
  contentAuthors?: string | string[]
  contentEditors?: string | string[]
  contentTags?: string | string[]
  contentPublishedDate?: string
  contentType?: 'Free' | 'Paid'
}

interface DataLayerMeteredWall {
  meteredType?: string
  meteredQuota?: string
}

interface DataLayerPilihanku {
  selectedCategories?: string[]
}

interface DataLayerRecommend {
  recoIndex?: string
  recoId?: string
  recoModel?: string
}

interface DataLayerRubric {
  rubricLocation?: string
  rubricName?: string
  rubricType?: string
}

interface DataLayerShare {
  shareLocation?: string
  shareTo?: string
}

interface DataLayerVideo {
  videoLocation?: string
}

interface DataLayerSectionCustom {
  sectionName?: string
  itemType?: string
  itemPosition?: number
}
// interface untuk payload (parameter) dari function getAllDataLayer
interface DataLayerPayload {
  bookmark?: Bookmark
  coachmarkLocation?: string
  contentCustom?: ContentCustom
  customPageType?: string
  customPageTitle?: string
  commentType?: number
  eventName?: string
  meteredWall?: MeteredWall
  paywallLocation?: string
  pilihanku?: Pilihanku
  recommend?: Recommend
  rubric?: Rubric
  searchKeyword?: string
  searchFilterType?: string
  share?: Share
  video?: Video
  iframeWidgetTitle?: string
  iframeWidgetLocation?: string
  section?: SectionCustom
}

interface DataLayer {
  event: string
  page_title: string
  page_type: string
  coachmark_location: string
  comment_type: number
  content_type: string
  content_id: string
  content_title: string
  content_authors: string
  content_editors: string
  content_tags: string
  content_published_date: string
  content_categories: string
  iframe_widget_title: string
  iframe_widget_location: string
  open_from: string
  user_type: string
  subscription_status: string
  metered_wall_type: string
  metered_wall_balance: number
  page_domain: string
  subscription_package: string
  bookmark_location: string
  share_location: string
  share_to: string
  searched_keyword: string
  search_filter_type: string
  audio_playing_location: string
  paywall_location: string
  paywall_subscription_package: string
  paywall_subscription_id: string
  paywall_subscription_price: number
  paywall_position: number
  pilihanku_selected: string
  reco_index: string
  reco_id: string
  reco_model: string
  rubric_location: string
  rubric_name: string
  rubric_type: string
  section_name: string
  item_type: string
  item_position: number
  video_playing_location: string
  user_id: string
}
