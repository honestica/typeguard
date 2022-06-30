echo "Converting .js files to .cjs"

FILES=$(find "./lib" -name "*.js")

for path in $FILES
do
    echo "Editing $path"
    sed -r -i "" "s/(require ?[^\"]+\"([^\"]+))\.js/\1.cjs/" "$path"
    mv "$path" "${path/%.js/.cjs}"
done
echo "Done converting files to .cjs"
