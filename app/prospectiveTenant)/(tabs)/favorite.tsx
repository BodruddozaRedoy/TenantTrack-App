import PageTitle from '@/components/common/PageTitle'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from 'react'
import { FlatList, Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Sample Data (URL Images)
const favoritesData = [
  {
    id: "1",
    title: "The Minimalist",
    location: "Brooklyn, New York",
    image: "https://images.unsplash.com/photo-1529429617124-95b109e86a5f",
  },
  {
    id: "2",
    title: "The Modern Tower",
    location: "Chicago, Illinois",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
  },
]

// Favorite Card
const FavoriteCard = ({ item }: any) => {
  return (
    <View className="mb-6 px-4">
      {/* Image */}
      <View className="w-full h-60 rounded-xl overflow-hidden mb-3 bg-gray-200 dark:bg-gray-700">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Title + Bookmark icon */}
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.title}
        </Text>

        <Pressable hitSlop={10}>
          <MaterialCommunityIcons
            name="bookmark"
            size={22}
            color={"#222"}
          />
        </Pressable>
      </View>

      {/* Location */}
      <Text className="text-gray-500 dark:text-gray-400">
        {item.location}
      </Text>
    </View>
  )
}

export default function FavoriteScreen() {
  return (
    <SafeAreaView className='flex-1 bg-background dark:bg-backgroundDark'>
      <PageTitle text='Favorites' />
      <View className='border-b border-gray-200 dark:border-gray-700 mb-4' />

      <FlatList
        data={favoritesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
