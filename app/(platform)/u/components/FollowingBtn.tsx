'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function IsFollowingBtn() {

    const [isFollowing, setIsFollowing] = useState(false)

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
    }

    return(
        <Button onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
};