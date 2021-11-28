import { ImageRequireSource } from "react-native";
import images from "../assets/images";

interface CommanType {
    id: number,
    title: string,
    createdAt: string,
    description: string,
    imageUri: ImageRequireSource,
}

export interface NewsFeed extends CommanType {
    likes: string | number
    comments: string | number
}

export interface EventProps extends CommanType {
   duration: string
}

export default {
    newsFeed: [
        {
            id: 0,
            title: 'SOBA General',
            createdAt: '2 minutes ago',
            description: '2021 / 2022 academic year welcomes..',
            imageUri: images.bg_soba,
            likes: 15,
            comments: 10
        },
        {
            id: 1,
            title: 'SJC SASSE',
            createdAt: '2 minutes ago',
            description: 'On this day Saint Josephs College Sasse..',
            imageUri: images.bg_soba,
            likes: 35,
            comments: 5
        },
    ],
    events: [
        {
            id: 0,
            title: 'SOBA General',
            createdAt: '2 minutes ago',
            description: 'SOBA America Mini Convention, SOBA TriState',
            imageUri: images.bg_soba,
            duration: 'November 19, 2021 - November 21, 2021',
        },
        {
            id: 1,
            title: 'SOBA Carolinas',
            createdAt: '2 minutes ago',
            description: 'Funeral Program for Late Soban Fondinka,',
            imageUri: images.bg_soba,
            duration: 'Fayetteville, North Carolina',
        },
    ]
}