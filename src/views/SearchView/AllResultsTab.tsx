import React from 'react'
import { Search_search_item_Channel, Search_search_item_Video } from '@/api/queries/__generated__/Search'
import { Placeholder, VideoPreviewBase, Text } from '@/shared/components'
import styled from '@emotion/styled'
import { sizes } from '@/shared/theme'
import { ChannelGallery, VideoGallery, VideoPreview } from '@/components'

type AllResultsTabProps = {
  videos: Search_search_item_Video[]
  channels: Search_search_item_Channel[]
  loading: boolean
}

const AllResultsTab: React.FC<AllResultsTabProps> = ({ videos: allVideos, channels, loading }) => {
  const [bestMatch, ...videos] = allVideos

  return (
    <>
      <div>
        {loading && (
          <>
            <Placeholder width={200} height={16} bottomSpace={18} />
            <VideoPreviewBase main />
          </>
        )}
        {bestMatch && (
          <>
            <h3>Best Match</h3>
            <VideoPreview
              id={bestMatch.id}
              channelId={bestMatch.channel.id}
              title={bestMatch.title}
              duration={bestMatch.duration}
              channelName={bestMatch.channel.handle}
              createdAt={bestMatch.createdAt}
              views={bestMatch.views}
              posterURL={bestMatch.thumbnailUrl}
              main
            />
          </>
        )}
      </div>
      {(videos.length > 0 || loading) && (
        <div>
          {loading ? (
            <Placeholder width={200} height={16} bottomSpace={18} />
          ) : (
            <SectionHeader variant="h5">Videos</SectionHeader>
          )}
          <VideoGallery videos={videos} loading={loading} />
        </div>
      )}
      {(channels.length > 0 || loading) && (
        <div>
          {loading ? (
            <Placeholder width={200} height={16} bottomSpace={18} />
          ) : (
            <SectionHeader variant="h5">Channels</SectionHeader>
          )}
          <ChannelGallery channels={channels} loading={loading} />
        </div>
      )}
    </>
  )
}

const SectionHeader = styled(Text)`
  margin: 0 0 ${sizes(4)};
`

export default AllResultsTab
