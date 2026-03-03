import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Home()
{
    return (
        <View style={{ padding: 16, gap: 12}}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
                Resource Directory
            </Text>

            <Link href="/categories" asChild>
                <Pressable style={{ padding: 12, borderWidth: 1, borderRadius: 10}}>
                    <Text>Browse Categories</Text>
                </Pressable>
            </Link>
        </View>
    )
} 