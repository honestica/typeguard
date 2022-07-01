#!/bin/bash

echo ""
echo "Converting .js files to .cjs"
echo ""

build_folder="$1"

if [ -z "${build_folder}" ]; then
	echo "\033[0;31mYou must provide a path to aim your build folder"
	exit 125
fi

if [ ! -d "${build_folder}" ]; then
	echo "\033[0;31m${build_folder} folder does not exist"
	exit 125
fi

files=$(find ${build_folder} -name "*.js")

if [ $? -ne 0 ]; then
	echo "\033[0;31m find command failed"
	exit 125
fi

for path in $files; do
    echo "Converting $path"

    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sed -r -i'' "s/(require ?[^\"]+\"([^\"]+))\.js/\1.cjs/" "$path"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        sed -r -i '' "s/(require ?[^\"]+\"([^\"]+))\.js/\1.cjs/" "$path"
    fi

	mv "$path" "${path/%.js/.cjs}"
done

echo ""
echo "Done converting files to .cjs"
echo ""
