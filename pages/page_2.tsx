import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const Page2: NextPage = () => {
    return (
        <Flex direction={'column'}>
            <Text fontWeight={"light"} fontSize={"14px"}>This is LIGHT_WEIGHT Text with font size of 14</Text>
            <Text mt = "30px" fontWeight={"medium"} fontSize={"14px"}>This is NORMAL Text with font size of 14</Text>
            <Text mt = "30px" fontWeight={"bold"} fontSize={"14px"}>This is BOLD Text with font size of 14</Text>
            <Text mt = "30px" fontWeight={"light"} fontSize={"20px"}>This is LIGHT_WEIGHT Text with font size of 20</Text>
            <Text mt = "30px" fontWeight={"medium"} fontSize={"20px"}>This is NORMAL Text with font size of 20</Text>
            <Text mt = "30px" fontWeight={"bold"} fontSize={"20px"}>This is BOLD Text with font size of 20</Text>
        </Flex>
    );
}

export default Page2;