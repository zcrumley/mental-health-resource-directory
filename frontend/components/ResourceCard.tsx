import { Pressable, Text } from "react-native";
import { Link } from "expo-router";
import type { Resource } from "../src/lib/api";

type Props = {
    resource: Resource;
};

export default function ResourceCard({ resource }: Props)
{
    return (
        <Link
            href={{
                pathname: "/resources/[id]",
                params: { id: String(resource.id) }
            }}
            asChild
        >
            <Pressable
                style={{
                    padding: 12,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 12
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {resource.name}
                </Text>

                {resource.address ? (
                    <Text>{resource.address}</Text>
                ) : null}
            </Pressable>
        </Link>
    );
}