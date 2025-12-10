import * as ReactQuery from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { get } from "lodash";
import type * as React from "react";

import config from "@/config";

import { MESSAGE_TYPE } from "@/utils/enums";

const queryResponseHandler = (data: any) => {
	const type = get(data, "data.message.type");
	const message = get(data, "data.message.message");


	if (type && message) {

		if (type === MESSAGE_TYPE.INFO) {
			alert("info");
		} else if (type === MESSAGE_TYPE.WARNING) {
			alert("warning");
		} else if (type === MESSAGE_TYPE.ERROR) {
			alert("error");
		}
	}
};

export const queryClient = new ReactQuery.QueryClient({
	queryCache: new ReactQuery.QueryCache({
		onSuccess: queryResponseHandler,
		onError: queryResponseHandler,
	}),
	mutationCache: new ReactQuery.MutationCache({
		onSuccess: queryResponseHandler,
		onError: queryResponseHandler,
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 2,
		},
	},
});

interface IProps {
	children: React.ReactNode;
}

const QueryProvider: React.FC<IProps> = ({ children }) => (
	<ReactQuery.QueryClientProvider client={queryClient}>
		{children}
		{config.app.isDev && <ReactQueryDevtools initialIsOpen={false} />}
	</ReactQuery.QueryClientProvider>
);

export default QueryProvider;
